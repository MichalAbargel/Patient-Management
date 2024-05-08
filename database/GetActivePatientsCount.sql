
CREATE FUNCTION GetActivePatientsCount(date_param DATE) RETURNS INT
BEGIN
    DECLARE active_count INT;
    
    SELECT COUNT(*) INTO active_count
    FROM (
        SELECT DISTINCT patients.id
        FROM defaultdb.patients
        WHERE patients.positive_result_date <= date_param
        AND (patients.recovery_date > date_param OR patients.recovery_date IS NULL)
    ) AS unique_patients;
    
    RETURN active_count;
END //

-- SELECT GetActivePatientsCount('2023-03-01') AS active_patients_count;