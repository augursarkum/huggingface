from transformers import pipeline
generator = pipeline("text-generation", model="distilgpt2")
word = input("-[ ")
res = generator(word,max_length=30,num_return_sequences=2)
print(res)