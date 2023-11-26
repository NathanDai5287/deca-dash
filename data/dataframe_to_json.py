import json
import pandas as pd

def df_to_json(df, path: str):
	category_gb = df.groupby('category')

	data = {}
	for category, group in category_gb:
		data[category] = [
			{
				'id': hash(str(row['question']) + str(row['a']) + str(row['b']) + str(row['c']) + str(row['d']) + str(row['explanation']) + str(category)),
				'question': row['question'],
				'options': [row['a'], row['b'], row['c'], row['d']],
				'correctAnswerIndex': row['answer'],
				'explanation': row['explanation'].lstrip(),
			}

			for _, row in group.iterrows()
		]

	with open(path, 'w') as f:
		json.dump(data, f, indent=2)

if __name__ == '__main__':
	df = pd.read_excel('DECA Dash.xlsx')

	df_to_json(df, 'data.json')
