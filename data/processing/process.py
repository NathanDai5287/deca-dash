import pandas as pd

from process_questions import df as df_questions
from process_answers import df as df_answers

category = 'Personal Financial Literacy'
id = 1276

df = pd.concat([df_questions, df_answers], axis=1)

df['id'] = id
df['category'] = category

# move id and category to the front
df = df[df.columns.tolist()[-2:] + df.columns.tolist()[:-2]]

df.to_clipboard(index=False)
