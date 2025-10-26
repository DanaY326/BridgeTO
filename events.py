from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime
import sqlalchemy
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.mutable import MutableList
from sqlalchemy.types import TypeDecorator, String as StringType
from pydantic import BaseModel
from typing import Optional, List
import datetime
import json

DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = sqlalchemy.orm.declarative_base()

class JSONList(TypeDecorator):
    """Stores and retrieves a Python list as JSON-encoded text."""
    impl = StringType
    cache_ok = True

    def process_bind_param(self, value, dialect):
        if value is not None:
            return json.dumps(value)
        return None

    def process_result_value(self, value, dialect):
        if value is not None:
            return json.loads(value)
        return None

class Event(Base):
    __tablename__ = "events"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    datetime = Column(String)
    groups = Column(MutableList.as_mutable(JSONList))
    approved = Column(Boolean)
    category = Column(String)
    organization = Column(String)

class ItemCreate(BaseModel):
    name: str
    description: str
    datetime: str
    groups: list[str]
    approved: bool
    category: str
    organization: str

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

router = APIRouter(prefix="/events", tags=["events"])

class ItemResponse(BaseModel):
    id: int
    name: str
    description: str
    datetime: str
    groups: list[str]
    approved: bool
    category: str
    organization: str

@router.get("/")
async def get_all_items(db: Session = Depends(get_db)):
    db_items = db.query(Event).all()
    if db_items is None:
        raise HTTPException(status_code=404, detail="No events found")
    return db_items

@router.get("/{event_id}")
async def read_item(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(Event).filter(Event.id == item_id).first()
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item

@router.post("/", response_model=ItemResponse)
async def create_event(params: ItemCreate, db: Session = Depends(get_db)):
    try:
        db_item = Event(**params.model_dump())
        db.add(db_item)
        db.commit()
        db.refresh(db_item)
        return db_item
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
