from pydantic import BaseModel,Field


class ChatResponse(BaseModel):
    answer:str = Field(description="Answer to the user's question based on financial data")
    suggestions: list[str] = Field(description="Relevant suggestions based on financial data")