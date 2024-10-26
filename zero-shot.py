from transformers import pipeline
classifier = pipeline("zero-shot-classification")
word = input("-[ ")
res = classifier(word,candidate_labels=["Education", "Commerce", "Business"])
print(res)