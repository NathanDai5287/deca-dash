with open('questions.txt', encoding='utf-8') as f:
	raw = f.read()

raw = raw.replace('  ', '').split('\n')

def is_question(line):
	return line[0].isdigit() and '.' in line[1:4] and '37.0326' not in line

def is_answer(line):
	return line[0] in {'A', 'B', 'C', 'D'} and line[1] == '.'

processed = []
for i, line in enumerate(raw):
	if not (any(char.isalnum() for char in line)): # no alphanumeric characters
		continue
	if (line.startswith('Test')):
		continue
	if (line.startswith('Copyright')):
		continue

	if not (is_question(line) or is_answer(line)):
		processed[-1] += ' ' + line
	else:
		processed.append(line[line.find('.') + 1:])
		# processed.append(line)

import numpy as np

processed = np.array(processed).reshape(-1, 5)

# print out processed with number in front of each question and a, b, c, or d in front of each answer
# import sys
# sys.stdout = open('delete.txt', 'w')
# for i, line in enumerate(processed):
# 	print([str(int(i / 5)), 'A. ', 'B. ', 'C. ', 'D. '][i % 5] + line)
# 1/0

import pandas as pd

df = pd.DataFrame(processed, columns=['question', 'a', 'b', 'c', 'd'])
# df.to_csv('questions.csv', index=False)

print(df)
