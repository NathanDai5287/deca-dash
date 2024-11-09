import json
import pathlib
import pandas as pd

from hashlib import md5

current = pathlib.Path(__file__).parent.absolute()

def df_to_json(df, path: str):
	category_gb = df.groupby('Category')

	data = {}
	for category, group in category_gb:
		data[category] = [
			{
				'id': md5((str(row['Question']) + str(row['A']) + str(row['B']) + str(row['C']) + str(row['D']) + str(row['Explanation']) + str(category)).encode()).hexdigest(),
				'question': row['Question'],
				'options': [row['A'], row['B'], row['C'], row['D']],
				'correctAnswerIndex': row['Answer'],
				'explanation': row['Explanation'].lstrip(),
			}

			for _, row in group.iterrows()
		]

	with open(current / path, 'w') as f:
		json.dump(data, f, indent=2)

if __name__ == '__main__':
	path = current / 'DECA Dash.xlsx'

	df = pd.read_excel(path)

	df_to_json(df, 'data.json')
