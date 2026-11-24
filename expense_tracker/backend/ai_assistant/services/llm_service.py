import json

from dotenv import load_dotenv
from langchain_groq import ChatGroq

from ai_assistant.prompts import expense_prompt
from ai_assistant.schemas import ChatResponse

load_dotenv()


llm = ChatGroq(
    model="openai/gpt-oss-120b",
    temperature=0.1,
    timeout=30,
    max_retries=2
)

structured_llm = llm.with_structured_output(ChatResponse)

chain = expense_prompt | structured_llm


def generate_ai_response(expense_data, query):

    response = chain.invoke({
        "expense_data": json.dumps(expense_data),
        "query": query
    })

    return response.model_dump()