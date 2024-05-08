DELIMITER //

CREATE PROCEDURE GetVaccinatedNumbers(OUT vaccinated_count INT, OUT not_vaccinated_count INT)
BEGIN
    DECLARE num1 INT;
    DECLARE num2 INT;
    
    SELECT COUNT(*) INTO num1
    FROM (
        SELECT DISTINCT patients.id
        FROM defaultdb.patients
        WHERE patients.id in (select vaccinations.p_id FROM defaultdb.vaccinations)
    ) AS unique_patients;
    
    SET vaccinated_count = num1;

    SELECT COUNT(*) INTO num2
    FROM (
        SELECT DISTINCT patients.id
        FROM defaultdb.patients
        WHERE patients.id not in (select vaccinations.p_id FROM defaultdb.vaccinations)
    ) AS unique_patients;
    
   SET not_vaccinated_count = num2;
   
END //

-- DELIMITER ;
-- SET @vaccinated_count = NULL;
-- SET @not_vaccinated_count = NULL;
-- CALL GetVaccinatedNumbers(@vaccinated_count, @not_vaccinated_count);
-- SELECT @vaccinated_count, @not_vaccinated_count;