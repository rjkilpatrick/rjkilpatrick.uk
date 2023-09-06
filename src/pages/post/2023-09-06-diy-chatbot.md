---
title: Make your own AI Chatbot
layout: "../../layouts/BlogLayout.astro"
preview: "Not affiliated with ChatGPT"
datePublished: 2023-09-06
---

## Introduction

AI chatbots like ChatGPT are pretty cool, no one's denying that, but also they train it on your inputs by default and you're at the mercy of OpenAI/Google/Other AI Overlord as to when you can use it.
Why not make/host your own?

## Setup

If you haven't got Python installed, you _probably_ want to install [miniconda](//docs.conda.io/projects/miniconda/en/latest/miniconda-install.html).

We need to install a few things first (scope it to the project):

- [Chainlit](https://docs.chainlit.io/installation)
- [`llama-cpp-python`](https://docs.chainlit.io/installation)
- [LangChain](https://python.langchain.com/docs/get_started/installation.html)

and you also want to install a llama model.
This is more complicated than it needs to be, but you sign up to ~~Facebook's~~ Meta's llama access [here](https://ai.meta.com/resources/models-and-libraries/llama-downloads/) and then download one of the `.gguf` files [here](https://huggingface.co/TheBloke/Llama-2-13B-chat-GGUF).
The one I'm using is called [llama-2-13b-chat.Q4_K_M.gguf](https://huggingface.co/TheBloke/Llama-2-13B-chat-GGUF/blob/main/llama-2-13b-chat.Q4_K_M.gguf).

## Chainlit

Chainlit is super easy to use, if you want an interactive app with most of the work done for you, then that's enough!

If you create a file called `app.py`, pop this into it

``` py
import chainlit as cl

@cl.on_message
async def main(message: str):
    await cl.Message(content=f"Received: {message}").send()
```

and then run the following command

``` sh
chainlit run app.py -w
```

The `-w` flag turns on auto-reloading, so you can edit `app.py` and it'll update live at <http://localhost:8000> (not http**s** for some reason).

## LangChain

``` py
from langchain.llms import LlamaCpp

llm = LlamaCpp(
    model_path="./models/llama-2-13b-chat.Q4_K_M.gguf", # Make sure you change this to the path you downloaded it to earlier
    max_tokens=2048,
)

output = llm("Q: Name the planets in the solar system? A: ", max_tokens=32, stop=["Q:", "\n"], echo=True)
print(output)
```

produces

```
{
  "id": "cmpl-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "object": "text_completion",
  "created": 1679561337,
  "model": "./models/7B/ggml-model.bin",
  "choices": [
    {
      "text": "Q: Name the planets in the solar system? A: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune and Pluto.",
      "index": 0,
      "logprobs": None,
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 14,
    "completion_tokens": 28,
    "total_tokens": 42
  }
}
```

## Combining them

Now if we stick them together, we find this, a pretty simple minimal working example for a chat bot.

``` py
import chainlit as cl
from langchain.llms import LlamaCpp
from langchain import PromptTemplate, LLMChain

template = """You are a helpful and friendly AI chatbot. Try and answer the following if you can.
Question: {question}
Answer: """

@cl.on_chat_start
def main():
    # Make sure the model path is correct for your system!
    llm = LlamaCpp(
        model_path="./models/llama-2-13b-chat.Q4_K_M.gguf",
        max_tokens=2048,
    )

    llm_chain = LLMChain(prompt=prompt, llm=llm, verbose=True)

    # Store the chain in the user session
    cl.user_session.set("llm_chain", llm_chain)


@cl.on_message
async def main(message: str):
    # Get chain from the user session
    llm_chain = cl.user_session.get("llm_chain")

    # Call the chain asynchronously
    res = await llm_chain.acall(message)

    await cl.Message(content=res["text"]).send()

```
