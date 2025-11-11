package com.levi.levi_intranet_backend.infrastructure.siesa.dao;

import com.levi.levi_intranet_backend.domain.siesa.ListaPrecios;
import com.levi.levi_intranet_backend.domain.siesa.TasaCambio;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Repository
public class TasaCambioDao {
    private final NamedParameterJdbcTemplate jdbc;

    public TasaCambioDao(NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    private static final RowMapper<TasaCambio> MAPPER = new RowMapper<TasaCambio>() {
        @Override
        public TasaCambio mapRow(ResultSet rs, int rowNum) throws SQLException {
            TasaCambio tc = new TasaCambio();
            tc.setCompania(rs.getShort("compania"));
            tc.setFecha(rs.getDate("fecha"));
            tc.setTasa(rs.getDouble("tasa"));
            tc.setIdMoneda(rs.getString("idMoneda"));
            tc.setIdTipoCambio(rs.getString("idTipoCambio"));

            return tc;
        }
    };

    public List<TasaCambio> findAllTasasCambio() {
        var sql = """
                SELECT
                    f018_id_cia as compania,
                    f018_fecha as fecha,
                    f018_tasa as tasa,
                    f018_id_moneda as idMoneda,
                    f018_id_tipo_cambio as idTipoCambio
                FROM t018_mm_tasas_cambio
                WHERE f018_id_cia = :Compania
                """;
        var params = Map.of("Compania", "01");
        var list = jdbc.query(sql,params, MAPPER);
        return list;
    }

}
