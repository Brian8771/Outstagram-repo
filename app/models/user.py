from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
# from sqlalchemy ForeignKey
from sqlalchemy.orm import relationship
from flask_login import UserMixin
from .post import Post, post_likes
from .comments import comment_likes

follows = db.Table(
    "follows",
    db.Column("follower_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE")),
    db.Column("followed_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"))
)
if environment == "production":
    follows.schema = SCHEMA

class User(db.Model, UserMixin):
    __tablename__ = 'users'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    fullname = db.Column(db.String(50), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_image = db.Column(db.String(500),default="https://res.cloudinary.com/zhihongliu/image/upload/v1658940427/cld-sample.jpg")
    bio = db.Column(db.String(300), default="My default bio.")

    followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.followed_id == id),
        backref=db.backref("following", lazy="dynamic", passive_deletes=True),
        #add cascade="all, delete" on Model and need test it the delete cascade
        lazy="dynamic",
        # cascade="all, delete"
    )

    like_posts = db.relationship(
        "Post",
        secondary=post_likes,
        back_populates="post_like_users",
        cascade="all, delete"
    )

    like_comments = db.relationship(
        "Comment",
        secondary=comment_likes,
        back_populates="comment_like_users",
        cascade="all, delete"
    )

    # posts = relationship("Post", back_populates="user", foreign_keys="Post.userId")
    posts = db.relationship("Post", back_populates="user", cascade="all, delete")
    # likes = relationship("Like", back_populates="user")
    # comments = relationship("Comment", back_populates="user")
    comments = db.relationship("Comment", back_populates="user", cascade="all, delete")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'fullname': self.fullname,
            'profile_image': self.profile_image,
            'bio': self.bio,
            'total_followers': self.followers.count(),
            'total_followings': self.following.count(),
            'total_posts': len(self.posts)
        }
