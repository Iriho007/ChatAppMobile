select  upd_time,tra_date , (BRA_CODE || ''''/'''' || CUS_NUM || ''''/'''' || CUR_CODE || ''''/'''' || LED_CODE || ''''/'''' || SUB_ACCT_CODE) AS ACCOUNT,

SUBSTR(remarks, 1, INSTR(remarks, ''''/'''') - 1) as  TRANSACTIONID
, REGEXP_SUBSTR(remarks, ''''/([0-9]+)'''', 1, 1, NULL, 1) MSISDN  ,tra_amt Amount, crnt_bal BALANCE, Deb_cre_ind INDICATOR
from  FROM [BANKS_PROD]..[BANKSYS].[TRANSACT] where tra_date='28 Jan 2025' and  led_code=5100 and sub_acct_code=2 and cus_num=104048 and Deb_cre_ind in (1,2) and can_rea_code=0
order by upd_time Asc


SELECT * FROM sys.fn_get_audit_file('path_to_log_files', null, null);

SELECT * FROM sys.server_audits;