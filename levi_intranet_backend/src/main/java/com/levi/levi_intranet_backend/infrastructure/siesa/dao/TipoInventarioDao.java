package com.levi.levi_intranet_backend.infrastructure.siesa.dao;

import com.levi.levi_intranet_backend.domain.siesa.CentroCostosSiesa;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class CentroCostosSiesaDao {
    private final NamedParameterJdbcTemplate jdbc;

    public CentroCostosSiesaDao(NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    private static final RowMapper<CentroCostosSiesa> MAPPER = new RowMapper<CentroCostosSiesa>() {
        @Override
        public CentroCostosSiesa mapRow(ResultSet rs, int rowNum) throws SQLException {
            CentroCostosSiesa cc = new CentroCostosSiesa();
            cc.setIdCentroCosto(rs.getString("idCentroCosto"));
            cc.setDescripcion(rs.getString("descripcion"));
            cc.setCentroCosto(rs.getString("centroCosto"));
            return cc;
        }
    };

    public List<CentroCostosSiesa> findAllCentroCostos() {
        var sql = """
                SELECT
                    f284_rowid as idCentroCosto,
                    f284_id as centroCosto,
                    f284_descripcion as descripcion
                    FROM t284_co_ccosto
                    WHERE f284_id_cia = 01
                    ORDER BY f284_id
                """;
        var list = jdbc.query(sql, MAPPER);
        return list;
    }

}