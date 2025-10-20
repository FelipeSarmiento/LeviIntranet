package com.levi.levi_intranet_backend.infrastructure.levis.dao;

import com.levi.levi_intranet_backend.domain.levis.BodegasJumbo;
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

@Repository
public class BonificacionesDao {
    private final NamedParameterJdbcTemplate jdbc;

    public BonificacionesDao(@Qualifier("levisJdbc") NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    private static final RowMapper<Quincenas> MAPPER_QUINCENAS = new RowMapper<Quincenas>() {
        @Override
        public Quincenas mapRow(ResultSet rs, int rowNum) throws SQLException {
            Quincenas q = new Quincenas();
            String quincena = rs.getString("strQuincena").trim();
            String substring = quincena.substring(quincena.length() - 4);
            q.setAnio(substring);
            q.setQuincena(quincena);
            q.setQuincenaNum(substring);
            q.setFechaFin(rs.getDate("dtmfechafinper"));
            q.setFechaInicio(rs.getDate("dtmfechainiper"));
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

}
