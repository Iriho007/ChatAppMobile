--SELECT TOP (1000) [swift_code]
--      ,[account]
--      ,[currency]
--  FROM [BNRLIVE].[dbo].[BANK_ACCT]

--  DROP TABLE [BNRLIVE].[dbo].[BANK_ACCT]

--create table [BNRLIVE].[dbo].[BANK_ACCT_BKP] FROM  (SELECT * FROM [BNRLIVE].[dbo].[BANK_ACCT])

select * from [BNRLIVE].[dbo].[BANK_ACCT]

--SELECT * FROM MGS_System
SELECT * FROM CODE_BNR_BANQUE

UPDATE MGS_System SET BNR_BIC='ZYAARWR0XXXX' WHERE BNR_BIC='BNRWRWRPXXXX'

update Utilisateur set UserStatus=0,Mustchange=0 where UserAccount='CLEARING'

selec