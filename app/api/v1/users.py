from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ...deps import get_db, get_current_user
from ...schemas.user import UserProfile, ProfileUpdate, PasswordChange, UserStats
from ...models.user import User
from ...core.security import verify_password, hash_password
from sqlalchemy import func

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/me", response_model=UserProfile)
def get_current_user_profile(user: User = Depends(get_current_user)):
    """Get current user's profile information"""
    return UserProfile(
        id=user.id,
        email=user.email,
        firstName=getattr(user, 'first_name', None),
        lastName=getattr(user, 'last_name', None),
        bio=getattr(user, 'bio', None),
        createdAt=user.created_at,
        updatedAt=getattr(user, 'updated_at', None),
        totalConversations=0,  # Will be calculated in stats endpoint
        totalMessages=0  # Will be calculated in stats endpoint
    )

@router.put("/me", response_model=UserProfile)
def update_user_profile(
    profile_update: ProfileUpdate, 
    user: User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    """Update current user's profile information"""
    # Only update fields if they exist in the database schema
    if hasattr(user, 'first_name') and profile_update.firstName is not None:
        user.first_name = profile_update.firstName
    if hasattr(user, 'last_name') and profile_update.lastName is not None:
        user.last_name = profile_update.lastName
    if hasattr(user, 'bio') and profile_update.bio is not None:
        user.bio = profile_update.bio
    
    # Update the updated_at timestamp
    if hasattr(user, 'updated_at'):
        from datetime import datetime
        user.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(user)
    
    return UserProfile(
        id=user.id,
        email=user.email,
        firstName=getattr(user, 'first_name', None),
        lastName=getattr(user, 'last_name', None),
        bio=getattr(user, 'bio', None),
        createdAt=user.created_at,
        updatedAt=getattr(user, 'updated_at', None),
        totalConversations=0,  # Will be calculated in stats endpoint
        totalMessages=0  # Will be calculated in stats endpoint
    )

@router.put("/me/password")
def change_password(
    password_data: PasswordChange,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Change user password"""
    # Verify current password
    if not verify_password(password_data.currentPassword, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect"
        )
    
    # Update password
    user.password_hash = hash_password(password_data.newPassword)
    db.commit()
    
    return {"message": "Password updated successfully"}

@router.post("/me/export")
def export_user_data(user: User = Depends(get_current_user)):
    """Export user data"""
    # TODO: Implement actual data export functionality
    return {
        "message": "Data export initiated. You will receive an email when ready.",
        "exportId": f"export_{user.id}_{int(user.created_at.timestamp())}"
    }

@router.delete("/me")
def delete_account(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete user account and all associated data"""
    # Delete user (cascade will handle sessions and messages)
    db.delete(user)
    db.commit()
    
    return {"message": "Account deleted successfully"}

@router.get("/me/stats", response_model=UserStats)
def get_user_stats(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user statistics"""
    from ...models.session import ChatSession
    from ...models.message import Message
    
    # Count sessions for this user
    total_sessions = db.query(func.count(ChatSession.id)).filter(ChatSession.user_id == user.id).scalar() or 0
    
    # Count messages across all user sessions
    total_messages = db.query(func.count(Message.id)).join(ChatSession).filter(ChatSession.user_id == user.id).scalar() or 0
    
    # Calculate member since
    from datetime import datetime
    now = datetime.utcnow()  # Use timezone-naive datetime to match user.created_at
    days_since = (now - user.created_at).days
    member_since = f"{days_since} days ago" if days_since > 0 else "Today"
    
    return UserStats(
        totalConversations=total_sessions,
        totalMessages=total_messages,
        memberSince=member_since
    )
