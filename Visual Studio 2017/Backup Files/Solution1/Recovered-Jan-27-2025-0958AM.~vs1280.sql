SELECT SELECT upd_time,
            tra_date AS Transaction_date,
            bra_code || ''/'' || cus_num || ''/'' || cur_code || ''/'' || led_code || ''/'' || sub_acct_code AS Account,
            SUBSTR(remarks, 1, INSTR(remarks, ''/'') - 1) AS TRANSACTIONID,
            REGEXP_SUBSTR(remarks, ''/([0-9]+)'', 1, 1, NULL, 1) AS MSISDN,
            tra_amt AS AMOUNT,
            crnt_bal AS Balance,
            Deb_cre_ind AS INDICATOR
  FROM [BANKS_PROD]..[BANKSYS].[TRANSACT] where tra_date = ('10 Jan 2025')
       AND led_code = 5100
       AND sub_acct_code = 2
       AND cus_num = 104048
       AND Deb_cre_ind IN (1, 2)
       AND can_rea_code = 0
     ORDER BY upd_time ASC



