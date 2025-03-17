SELECT *
  FROM [BNRLIVE].[dbo].[SWIFT_MT103]
  where Authorizer = 'Ebanking' 
  and cast(send_date as date) between '01 feb  2025' AND '07 feb  2025' and OrderingCustAcct='211/285231/1/5106/0'

  +


SELECT *
  FROM [BNRLIVE].[dbo].[Cp_Virement]
  where Authorizer = 'Ebanking' 
  and cast(send_date as date between '01 feb  2025' AND '07 feb  2025' and CompteDon='211/285231/1/5106/0'