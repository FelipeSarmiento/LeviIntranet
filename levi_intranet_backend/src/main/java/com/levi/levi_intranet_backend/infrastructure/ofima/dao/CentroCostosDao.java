package com.levi.levi_intranet_backend.infrastructure.ofima.dao;

import com.levi.levi_intranet_backend.domain.ofima.CentroCostosOfima;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class CentroCostosDao {
    private final NamedParameterJdbcTemplate jdbc;

    public CentroCostosDao(@Qualifier("ofimaJdbc") NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    private static final RowMapper<CentroCostosOfima> MAPPER = new RowMapper<CentroCostosOfima>() {
        @Override
        public CentroCostosOfima mapRow(ResultSet rs, int rowNum) throws SQLException {
            CentroCostosOfima c = new CentroCostosOfima();
            c.setCodigo(rs.getString("codigo").trim());
            c.setDescripcion(rs.getString("descripcion").trim());
            return c;
        }
    };

    public List<CentroCostosOfima> findAllCentroCostos() {
        String sql = """
        SELECT
            CODCC as codigo,
            NOMBRE as descripcion
        FROM CENTCOS
        """;
        return jdbc.query(sql, MAPPER);
    }

}
