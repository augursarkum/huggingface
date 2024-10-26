from transformers import pipeline
classifier = pipeline("sentiment-analysis")
word = input("-[ ")
res = classifier(word)
print(res)