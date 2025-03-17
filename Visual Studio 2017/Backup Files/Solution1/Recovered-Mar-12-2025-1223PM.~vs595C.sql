SELECT TOP (1000) [User_ID]
      ,[Source_Acct_No]
      ,[Beneficiary_Acct_No]
      ,[Amount]
      ,[Medium]
      ,[Date]
      ,[Remark]
  FROM [e_one].[dbo].[Third_Party_Transfer_Log_Err] where Remark like '%Jean Jacques IRADUKU%' --order by date desc where Source_Acct_No='211/285231/1/5106/0' 
