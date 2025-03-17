import pandas as pd

data = {'AGE': [15, 20, 25, 30], 'SALARY': [50, 100, 200, 250]}
df = pd.DataFrame(data)
average_age = df['AGE'].mean()
average_age

# %% [markdown]
# The average age in the provided data is 22.5.

# %% [markdown]
# Calculate the correlation between age and salary from the provided data

# %%
import pandas as pd

data = {'AGE': [15, 20, 25, 30], 'SALARY': [50, 100, 200, 250]}
df = pd.DataFrame(data)
correlation = df['AGE'].corr(df['SALARY'])
correlation