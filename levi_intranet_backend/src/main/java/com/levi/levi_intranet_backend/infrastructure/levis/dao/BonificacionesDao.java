package com.levi.levi_intranet_backend.infrastructure.levis.dao;

import com.levi.levi_intranet_backend.api.levis.dto.BonificacionesDtos;
import com.levi.levi_intranet_backend.domain.levis.BodegasJumbo;
import com.levi.levi_intranet_backend.domain.levis.Bonificaciones;
import com.levi.levi_intranet_backend.domain.levis.Quincenas;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
// Java
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;

@Repository
public class BonificacionesDao {
    private final NamedParameterJdbcTemplate jdbc;

    public BonificacionesDao(@Qualifier("levisJdbc") NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    private static final RowMapper<Bonificaciones> MAPPER = new RowMapper<Bonificaciones>() {
        @Override
        public Bonificaciones mapRow(ResultSet rs, int rowNum) throws SQLException {
            Bonificaciones b = new Bonificaciones();
            b.setEmpleado(rs.getLong("empleado"));
            b.setPeriodo(rs.getString("periodo").trim());
            b.setValor(rs.getDouble("valor"));
            b.setResponsable(rs.getString("responsable").trim());
            b.setFechaCaptura(rs.getDate("fechaCaptura"));
            return b;
        }

    };

    private static final RowMapper<Quincenas> MAPPER_QUINCENAS = new RowMapper<Quincenas>() {
        @Override
        public Quincenas mapRow(ResultSet rs, int rowNum) throws SQLException {
            Quincenas q = new Quincenas();
            String quincena = rs.getString("strQuincena").trim();
            String substring = quincena.substring(quincena.length() - 4);
            q.setAnio(substring);
            q.setQuincena(quincena);
            q.setQuincenaNum(substring);
            java.sql.Date sqlFechaInicio = rs.getDate("dtmfechainiper");
            java.sql.Date sqlFechaFin = rs.getDate("dtmfechafinper");

            q.setFechaInicio(sqlFechaInicio != null ? new java.util.Date(sqlFechaInicio.getTime()) : null);
            q.setFechaFin(sqlFechaFin != null ? new java.util.Date(sqlFechaFin.getTime()) : null);
            return q;
        }

    };

    public List<Quincenas> findAllQuincenas() {
        try {
            var sql = """
                    SELECT
                        [tblQuincenas].[strQuincena] AS [strQuincena],
                        [tblQuincenas].[dtmFechaIni] AS [dtmFechaIni],
                        [tblQuincenas].[dtmFechaFin] AS [dtmFechaFin],
                        [tblQuincenas].[dtmFchIniRes] AS [dtmFchIniRes],
                        [tblQuincenas].[dtmFchFinRes] AS [dtmFchFinRes],
                        [tblQuincenas].[dtmfechainiper] AS [dtmfechainiper],
                        [tblQuincenas].[dtmfechafinper] AS [dtmfechafinper]
                        FROM [NOMINA].[tblQuincenas] AS [tblQuincenas]
                        WHERE strQuincena != ''
                    """;
            var list = jdbc.query(sql, MAPPER_QUINCENAS);
            return list;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public List<Bonificaciones> findAllBonificacionesByPeriodoAndResponsable(String periodo, String responsable) {
        try {
            String sql = """
                    SELECT 
                        empleado AS empleado,
                        periodo AS periodo,
                        valor AS valor,
                        responsable AS responsable,
                        fechaCaptura as fechaCaptura
                    FROM Tbl_Bonificacion
                    WHERE periodo = :Periodo
                    AND responsable = :Responsable
                    """;
            var params = Map.of("Periodo", periodo, "Responsable", responsable);
            var list = jdbc.query(sql, params, MAPPER);
            return list;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public boolean addBonificaciones(String periodo, String responsable, BonificacionesDtos.BonificacionesExcel[] bonificaciones) {
        try {
            boolean result = deleteBonificaciones(periodo, responsable);
            if (result) {
                StringBuilder values = new StringBuilder();
                for (BonificacionesDtos.BonificacionesExcel b : bonificaciones) {
                    values.append("(")
                            .append(b.cedula()).append(", ")
                            .append("'").append(periodo).append("', ")
                            .append(b.pagoBonificacion()).append(", ")
                            .append("'").append(responsable).append("', ")
                            .append("GETDATE()")
                            .append(",0, 'false'),");
                }

                String sql = """
                         INSERT INTO Tbl_Bonificacion (empleado, periodo, valor, responsable, fechaCaptura, ccostos, generado) VALUES
                         """ + values.substring(0, values.length() - 1);

                int rowsAffected = jdbc.getJdbcTemplate().update(sql);
                return rowsAffected > 0;
            }
            return false;
        } catch (Exception e) {
            throw new RuntimeException("Error inserting bonificaciones", e);
        }
    }

    public boolean deleteBonificaciones(String periodo, String responsable){
        String sql = """
            DELETE FROM Tbl_Bonificacion
            WHERE periodo = :Periodo
              AND responsable = :Responsable
            """;

        var params = new MapSqlParameterSource()
                .addValue("Periodo", periodo)
                .addValue("Responsable", responsable);

        int rowsAffected = jdbc.update(sql, params);
        return rowsAffected > 0;
    }

}