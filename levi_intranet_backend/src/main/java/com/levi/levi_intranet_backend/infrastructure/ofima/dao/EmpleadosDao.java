package com.levi.levi_intranet_backend.infrastructure.ofima.dao;

import com.levi.levi_intranet_backend.domain.ofima.Empleados;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.*;

@Repository
public class EmpleadosDao {
    private final NamedParameterJdbcTemplate jdbc;

    public EmpleadosDao(@Qualifier("ofimaJdbc") NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    private static final RowMapper<Empleados> MAPPER = new RowMapper<Empleados>() {
        @Override
        public Empleados mapRow(ResultSet rs, int rowNum) throws SQLException {
            Empleados c = new Empleados();
            c.setActivo(rs.getInt("Activo"));
            c.setCargo(rs.getString("Cargo").trim().toUpperCase(Locale.ROOT));
            c.setNombre(rs.getString("Nombre").trim().toUpperCase(Locale.ROOT));
            c.setEmpresa(rs.getString("Empresa").trim());
            c.setFechaContrato(rs.getDate("FechaContrato"));
            c.setFechaRetiro(rs.getDate("FechaRetiro"));
            c.setCedula(rs.getString("Cedula").trim());
            c.setPrimerNombre(rs.getString("PrimerNombre").trim().toUpperCase(Locale.ROOT));
            c.setSegundoNombre(rs.getString("SegundoNombre").trim().toUpperCase(Locale.ROOT));
            c.setPrimerApellido(rs.getString("PrimerApellido").trim().toUpperCase(Locale.ROOT));
            c.setSegundoApellido(rs.getString("SegundoApellido").trim().toUpperCase(Locale.ROOT));
            c.setTipoContrato(rs.getString("TipoContrato").trim());
            c.setSalarioFijo(rs.getString("SalarioFijo").trim());
            c.setSalarioIntegral(rs.getString("SalarioIntegral").trim());
            double salario = rs.getDouble("ValorHora") * rs.getInt("HorasMes");
            DecimalFormat df = new DecimalFormat("#,000.000");
            c.setValorSalario(df.format(salario));
            c.setValorSalarioLetras(convertirNumeroALetras(salario));

            return c;
        }
    };

    private static final RowMapper<Empleados> MAPPER_CONTRATOS_VENCER = new RowMapper<Empleados>() {
        @Override
        public Empleados mapRow(ResultSet rs, int rowNum) throws SQLException {
            Empleados c = new Empleados();
            c.setCargo(rs.getString("Cargo").trim().toUpperCase(Locale.ROOT));
            c.setNombre(String.join(" ", rs.getString("Nombre").trim().split(" ")).toUpperCase(Locale.ROOT));
            c.setFechaContrato(rs.getDate("FechaContrato"));
            c.setFechaRetiro(rs.getDate("FechaRetiro"));
            c.setCedula(rs.getString("Cedula").trim());
            c.setProrrogaUno(rs.getDate("ProrrogaUno"));
            c.setProrrogaDos(rs.getDate("ProrrogaDos"));
            c.setProrrogaTres(rs.getDate("ProrrogaTres"));
            c.setCodigoCentroCostos(rs.getString("CodigoCentroCostos").trim());
            c.setNombreCentroCostos(rs.getString("NombreCentroCostos").trim());
            c.setDuracionContrato(rs.getString("DuracionContrato"));
            c.setEmail(rs.getString("Email").trim());

            return c;
        }
    };

    public Optional<Empleados> findEmpleadoActivoByCedula(String cedula) {
        String sql = """
        SELECT TOP 1
            CEDULA AS Cedula,
            Nombre AS Nombre,
            FECING AS FechaContrato,
            FECRETIRO AS FechaRetiro,
            'LEVIS' AS Empresa,
            SALINTEGR AS SalarioIntegral,
            SALFIJO AS SalarioFijo,
            CAST(VALORHORA AS DECIMAL(18,2)) * CAST(HORASMES AS DECIMAL(18,2)) AS ValorSalario,
            CAST(VALORHORA * HORASMES AS VARCHAR(50)) AS ValorSalarioLetras,
            LOWER(CARGO) AS Cargo,
            LOWER(TIPCONTRA) AS TipoContrato,
            LOWER(APELLIDO) AS PrimerApellido,
            APELLIDO2 AS SegundoApellido,
            NOMBRE AS PrimerNombre,
            NOMBRE2 AS SegundoNombre,
            ACTIVO AS Activo,
            VALORHORA AS ValorHora,
            HORASMES AS HorasMes
        FROM MTEMPLEA
        WHERE CEDULA = :Cedula AND ACTIVO = 0
        ORDER BY FECING DESC
""";
        var params = Map.of("Cedula", cedula);
        return jdbc.query(sql, params, MAPPER).stream().findFirst();
    }
    public List<Empleados> findEmpleadosActivoByCedula(String cedula) {
        String sql = """
        SELECT
            CEDULA AS Cedula,
            Nombre AS Nombre,
            FECING AS FechaContrato,
            FECRETIRO AS FechaRetiro,
            'LEVIS' AS Empresa,
            SALINTEGR AS SalarioIntegral,
            SALFIJO AS SalarioFijo,
            CAST(VALORHORA AS DECIMAL(18,2)) * CAST(HORASMES AS DECIMAL(18,2)) AS ValorSalario,
            CAST(VALORHORA * HORASMES AS VARCHAR(50)) AS ValorSalarioLetras,
            LOWER(CARGO) AS Cargo,
            LOWER(TIPCONTRA) AS TipoContrato,
            LOWER(APELLIDO) AS PrimerApellido,
            APELLIDO2 AS SegundoApellido,
            NOMBRE AS PrimerNombre,
            NOMBRE2 AS SegundoNombre,
            ACTIVO AS Activo,
            VALORHORA AS ValorHora,
            HORASMES AS HorasMes
        FROM MTEMPLEA
        WHERE CEDULA = :Cedula AND ACTIVO = 0
        ORDER BY FECING DESC
""";
        var params = Map.of("Cedula", cedula);
        return jdbc.query(sql, params, MAPPER);
    }
    public List<Empleados> findEmpleadosProximosVencer() {
        String sql = """
        SELECT enc.CEDULA                                                          as Cedula,
               (RTRIM(LTRIM(enc.APELLIDO)) + ' ' + RTRIM(LTRIM(enc.APELLIDO2)) + ' ' + RTRIM(LTRIM(enc.NOMBRE)) + ' ' + RTRIM(LTRIM(enc.NOMBRE2)))            as Nombre,
               enc.CODCC                                                           as CodigoCentroCostos,
               cc.NOMBRE                                                           as NombreCentroCostos,
               DATEDIFF(M, enc.FECING, enc.FINCONT)                                as DuracionContrato,
               enc.FECING                                                          as FechaContrato,
               enc.FINCONT                                                         as FechaRetiro,
               DATEADD(M, (DATEDIFF(M, enc.FECING, enc.FINCONT)), enc.FINCONT)     as ProrrogaUno,
               DATEADD(M, (DATEDIFF(M, enc.FECING, enc.FINCONT)) * 2, enc.FINCONT) as ProrrogaDos,
               DATEADD(M, (DATEDIFF(M, enc.FECING, enc.FINCONT)) * 3, enc.FINCONT) as ProrrogaTres,
               enc.CARGO                                                           as Cargo,
               enc.EMAIL                                                           as Email
        from LEVIS.dbo.MTEMPLEA enc
                 inner join
             LEVIS.dbo.CENTCOS cc on cc.CODCC = enc.CODCC
        where enc.TIPCONTRA = 'fijo'
          and enc.ACTIVO = 0
          AND enc.APRENDIZ = 0
        AND enc.CARGO NOT LIKE '%APRENDIZ%'
        order by enc.CODCC
""";
        return jdbc.query(sql, MAPPER_CONTRATOS_VENCER);
    }
    public List<Empleados> findEmpleadosProximosVencerByCedula(String cedula, String centroCostos) {
        String sql = """
        SELECT enc.CEDULA                                                          as Cedula,
               (RTRIM(LTRIM(enc.APELLIDO)) + ' ' + RTRIM(LTRIM(enc.APELLIDO2)) + ' ' + RTRIM(LTRIM(enc.NOMBRE)) + ' ' + RTRIM(LTRIM(enc.NOMBRE2)))           as Nombre,
               enc.CODCC                                                           as CodigoCentroCostos,
               cc.NOMBRE                                                           as NombreCentroCostos,
               DATEDIFF(M, enc.FECING, enc.FINCONT)                                as DuracionContrato,
               enc.FECING                                                          as FechaContrato,
               enc.FINCONT                                                         as FechaRetiro,
               DATEADD(M, (DATEDIFF(M, enc.FECING, enc.FINCONT)), enc.FINCONT)     as ProrrogaUno,
               DATEADD(M, (DATEDIFF(M, enc.FECING, enc.FINCONT)) * 2, enc.FINCONT) as ProrrogaDos,
               DATEADD(M, (DATEDIFF(M, enc.FECING, enc.FINCONT)) * 3, enc.FINCONT) as ProrrogaTres,
               enc.CARGO                                                           as Cargo,
               enc.EMAIL                                                           as Email
        from LEVIS.dbo.MTEMPLEA enc
                 inner join
             LEVIS.dbo.CENTCOS cc on cc.CODCC = enc.CODCC
        where enc.TIPCONTRA = 'fijo'
          and enc.ACTIVO = 0
          AND enc.APRENDIZ = 0
          AND enc.CARGO NOT LIKE '%APRENDIZ%'
          AND enc.CEDULA = :Cedula
          AND enc.CODCC = :CentroCostos
        order by enc.CODCC
""";
        var params = Map.of("Cedula", cedula, "CentroCostos", centroCostos);
        return jdbc.query(sql, params, MAPPER_CONTRATOS_VENCER);
    }
    public Optional<Empleados> findEmpleadoRetiradoByCedula(String cedula) {
        String sql = """
            WITH Datos AS (
              SELECT
                  CEDULA,
                  NOMBRE,
                  FECING,
                  FECRETIRO,
                  'LEVIS' AS Empresa,
                  SALINTEGR AS SalarioIntegral,
                  SALFIJO AS SalarioFijo,
                  CAST(VALORHORA AS DECIMAL(18,2)) * CAST(HORASMES AS DECIMAL(18,2)) AS ValorSalario,
                  CAST(VALORHORA * HORASMES AS VARCHAR(50)) AS ValorSalarioLetras,
                  LOWER(CARGO) AS Cargo,
                  LOWER(TIPCONTRA) AS TipoContrato,
                  LOWER(APELLIDO) AS PrimerApellido,
                  APELLIDO2 AS SegundoApellido,
                  NOMBRE AS PrimerNombre,
                  NOMBRE2 AS SegundoNombre,
                  ACTIVO,
                  VALORHORA,
                  HORASMES
              FROM MTEMPLEA
              WHERE CEDULA = :Cedula AND ACTIVO = 1
            )
            SELECT
              Cedula ,
              PrimerNombre,
              SegundoNombre,
              PrimerApellido,
              SegundoApellido,
              Empresa,
              SalarioIntegral,
              SalarioFijo,
              ValorSalario,
              ValorSalarioLetras,
              Cargo,
              TipoContrato,
              Activo,
              ValorHora,
              HorasMes,
              NOMBRE as Nombre,
              (SELECT MIN(FECING) FROM Datos) AS FechaContrato,
              (SELECT MAX(FECRETIRO) FROM Datos) AS FechaRetiro
            FROM Datos
            WHERE FECING = (SELECT MIN(FECING) FROM Datos)
            """;
        var params = Map.of("Cedula", cedula);
        return jdbc.query(sql, params, MAPPER).stream().findFirst();
    }
    public List<Empleados> findEmpleadosRetiradoByCedula(String cedula) {
        String sql = """
        SELECT
            CEDULA AS Cedula,
            Nombre AS Nombre,
            FECING AS FechaContrato,
            FECRETIRO AS FechaRetiro,
            'LEVIS' AS Empresa,
            SALINTEGR AS SalarioIntegral,
            SALFIJO AS SalarioFijo,
            CAST(VALORHORA AS DECIMAL(18,2)) * CAST(HORASMES AS DECIMAL(18,2)) AS ValorSalario,
            CAST(VALORHORA * HORASMES AS VARCHAR(50)) AS ValorSalarioLetras,
            LOWER(CARGO) AS Cargo,
            LOWER(TIPCONTRA) AS TipoContrato,
            LOWER(APELLIDO) AS PrimerApellido,
            APELLIDO2 AS SegundoApellido,
            NOMBRE AS PrimerNombre,
            NOMBRE2 AS SegundoNombre,
            ACTIVO AS Activo,
            VALORHORA AS ValorHora,
            HORASMES AS HorasMes
            FROM MTEMPLEA
        WHERE CEDULA = :Cedula AND ACTIVO = 1
""";
        var params = Map.of("Cedula", cedula);
        return jdbc.query(sql, params, MAPPER);
    }

    public static String convertirNumeroALetras(double numero) {
        if (numero == 0) {
            return "CERO PESOS";
        }

        long parteEntera = (long) Math.floor(numero);
        int centavos = (int) (numero - parteEntera);

        String letras = numeroALetras(parteEntera) + " PESOS";

        if (centavos > 0) {
            letras += " CON " + String.format("%03d", centavos) + " CENTAVOS";
        }

        return letras.toUpperCase();
    }

    private static String numeroALetras(long numero) {
        if (numero == 0) return "";

        if (numero < 0) return "MENOS " + numeroALetras(Math.abs(numero));

        String[] unidades = {"", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez",
                "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho",
                "diecinueve", "veinte"};
        String[] decenas = {"", "", "veinti", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"};
        String[] centenas = {"", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos",
                "seiscientos", "setecientos", "ochocientos", "novecientos"};

        if (numero < 21) {
            return unidades[(int) numero];
        }

        if (numero < 100) {
            int decena = (int) (numero / 10);
            int unidad = (int) (numero % 10);

            if (numero <= 29) {
                return decenas[decena] + unidades[unidad];
            } else {
                return decenas[decena] + (unidad > 0 ? " y " + unidades[unidad] : "");
            }
        }

        if (numero < 1000) {
            int centena = (int) (numero / 100);
            long resto = numero % 100;

            if (numero == 100) return "cien";

            return centenas[centena] + (resto > 0 ? " " + numeroALetras(resto) : "");
        }

        if (numero < 1000000) {
            long miles = numero / 1000;
            long resto = numero % 1000;

            String milesTexto = miles == 1 ? "mil" : numeroALetras(miles) + " mil";

            return milesTexto + (resto > 0 ? " " + numeroALetras(resto) : "");
        }

        if (numero < 1000000000000L) {
            long millones = numero / 1000000;
            long resto = numero % 1000000;

            String millonesTexto = millones == 1 ? "un millón" : numeroALetras(millones) + " millones";

            return millonesTexto + (resto > 0 ? " " + numeroALetras(resto) : "");
        }

        return "Número demasiado grande";
    }

}
