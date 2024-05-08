DELIMITER //

CREATE PROCEDURE GetActivePatientsCountForCurrentMonth(OUT date_param DATE, OUT active_patients_count INT)
BEGIN
    DECLARE current_date_param DATE;
    DECLARE start_date DATE;
    
    SET current_date_param = CURDATE();
    SET start_date = CONCAT(YEAR(current_date_param), '-', MONTH(current_date_param), '-01');
    
    WHILE start_date <= current_date_param DO
        SET date_param = start_date;
        SET active_patients_count = GetActivePatientsCount(start_date);
        SELECT date_param, active_patients_count;
        
        SET start_date = DATE_ADD(start_date, INTERVAL 1 DAY);
    END WHILE;
END //

DELIMITER ;

-- SET @date_param = NULL;
-- SET @active_patients_count = NULL;
-- CALL GetActivePatientsCountForCurrentMonth(@date_param, @active_patients_count);
-- SELECT @date_param, @active_patients_count;
