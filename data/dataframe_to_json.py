import json
import pandas as pd

def df_to_json(df, path: str):
	category_gb = df.groupby('Category')

	data = {}
	for category, group in category_gb:
		data[category] = [
			{
				'id': hash(str(row['Question']) + str(row['A']) + str(row['B']) + str(row['C']) + str(row['D']) + str(row['Explanation']) + str(category)),
				'question': row['Question'],
				'options': [row['A'], row['B'], row['C'], row['D']],
				'correctAnswerIndex': row['Answer'],
				'explanation': row['Explanation'].lstrip(),
			}

			for _, row in group.iterrows()
		]

	with open(path, 'w') as f:
		json.dump(data, f, indent=2)

if __name__ == '__main__':
	df = pd.read_excel('DECA Dash.xlsx')

	df_to_json(df, 'data.json')
