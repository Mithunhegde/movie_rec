# Read user input from command line (provided by Node.js)
# Your Python code here, based on the user input
import sys
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from nltk.corpus import stopwords
import numpy as np
import nltk
nltk.download('stopwords')
import json

user_input = sys.argv[1]

# Load the CSV file into a pandas DataFrame
df = pd.read_csv('Movie_combined.csv')  

# Input plot to find similar plots for
input_plot = user_input

# Step 1: Preprocess the text data
stop_words = set(stopwords.words("english"))

def preprocess_text(text):
    # Lowercase the text
    text = text.lower()
    # Remove stopwords
    text = ' '.join([word for word in text.split() if word not in stop_words])
    return text

df['Plot'] = df['Plot'].apply(preprocess_text)
input_plot = preprocess_text(input_plot)

# Step 2: Create TF-IDF vectors for the plots
tfidf_vectorizer = TfidfVectorizer()
tfidf_matrix = tfidf_vectorizer.fit_transform(df['Plot'])

# Step 3: Calculate cosine similarity between input plot and all other plots
cosine_similarities = linear_kernel(tfidf_vectorizer.transform([input_plot]), tfidf_matrix).flatten()

# Step 4: Get the indices of the top 10 most similar plots
top_10_indices = cosine_similarities.argsort()[:-11:-1]  # Get top 10 indices in descending order

# Step 5: Get the top 10 similar plots
top_10_similar_plots = df.iloc[top_10_indices]

idlist= top_10_similar_plots['id']

arr=np.array(idlist)
print(arr)