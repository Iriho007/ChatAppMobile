SELECT SUM (tra_amt)
  FROM [GTCollection].[dbo].[transactions] where PaidDate <= CAST('2024-12-31' AS DATE)--order by trans_date asc
