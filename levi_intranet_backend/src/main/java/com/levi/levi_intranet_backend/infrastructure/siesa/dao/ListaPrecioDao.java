package com.levi.levi_intranet_backend.infrastructure.siesa.dao;

import com.levi.levi_intranet_backend.domain.siesa.Bodegas;
import com.levi.levi_intranet_backend.domain.siesa.ListaPrecios;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class ListaPrecioDao {
    private final NamedParameterJdbcTemplate jdbc;

    public ListaPrecioDao(NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    private static final RowMapper<ListaPrecios> MAPPER = new RowMapper<ListaPrecios>() {
        @Override
        public ListaPrecios mapRow(ResultSet rs, int rowNum) throws SQLException {
            ListaPrecios lp = new ListaPrecios();

            lp.setId(rs.getString("id"));
            lp.setDescripcion(rs.getString("descripcion"));

            return lp;
        }
    };

    public List<ListaPrecios> findAllListaPrecios() {
        var sql = "SELECT f112_id as id,f112_descripcion as descripcion from t112_mc_listas_precios where f112_id_cia = '01'";

        var list = jdbc.query(sql, MAPPER);
        return list;
    }

}
