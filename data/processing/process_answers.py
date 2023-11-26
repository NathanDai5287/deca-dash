with open('answers.txt', encoding='utf-8') as f:
	raw = f.read()

raw = raw.split('\n')

def is_question(line):
	# return line[0].isdigit() and '.' in line[1:4] and 'Cengage' not in line

	if not (line[0].isdigit()):
		return False

	pos = line.find('. ')
	if (pos == -1):
		return False

	if (pos > 3):
		return False

	# make sure all the digits in front of the period are numbers
	if not (all(char.isdigit() for char in line[:pos])):
		return False

	if (line[pos + 2] not in {'A', 'B', 'C', 'D'}):
		return False

	if ('Cengage' in line):
		return False


	return True

answer_map = {'A': 0, 'B': 1, 'C': 2, 'D': 3}

processed = []
source_toggle = False
for i, line in enumerate(raw):
	if not (any(char.isalnum() for char in line)):
		continue
	if (line.startswith('Test')):
		continue
	if (line.startswith('SOURCE')):
		continue
	if (line.endswith('KEY')):
		continue
	if (line.startswith('Copyright')):
		continue
	if (len(line) <= 2 and line[0].isnumeric()):
		continue

	if (raw[max(0, i - 1)].startswith('SOURCE') != raw[i].startswith('SOURCE')):
		source_toggle = not source_toggle

	if not (is_question(line)):
		if (source_toggle):
			continue

		processed[-1] += ' ' + line
	else:
		processed.append(line)

		source_toggle = False

processed = [(answer_map[line[(pos := line.find('. ')) + 2]], line[pos + 2 + 1:]) for line in processed]

import pandas as pd

df = pd.DataFrame(processed, columns=['answer', 'explanation'])
# df.to_csv('answers.csv', index=False)

print(df)
