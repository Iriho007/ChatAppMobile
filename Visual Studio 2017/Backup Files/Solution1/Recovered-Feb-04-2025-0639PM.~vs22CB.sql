SELECT TOP (1000) [BatchID]
      ,[CustomerID]
      ,[UploadDate]
      ,[UploadBy]
      ,[Status]
      ,[TransCount]
      ,[TransTotal]
      ,[NextApprover]
      ,[TransType]
      ,[BatchType]
      ,[PayProcess]
      ,[PayProcessRef]
      ,[Expl_Code]
      ,[Credit_Suspense]
      ,[Credit_Suspense_Date]
      ,[Credit_Suspense_Failed_Count]
      ,[Debit_Suspense]
      ,[Debit_Suspense_Date]
      ,[Debit_Suspense_Amount]
      ,[Debit_Suspense_Failed_Count]
      ,[Credit_Suspense_Amount]
      ,[UseVendorList]
      ,[Debit_Charge_Amount]
      ,[Debit_Suspense_Amount_NIP]
      ,[LastCreditSuspenseFailCountTime]
      ,[Debit_Suspense_NIP]
      ,[Debit_Suspense_Date_NIP]
      ,[Recurring_Payment]
      ,[Charge_Amount_Debited]
      ,[Charge_Amount_Debited_Date]
  FROM [GAPS_DEV].[dbo].[Batch] where BatchID=82623
   