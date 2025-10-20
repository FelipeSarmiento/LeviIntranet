package com.levi.levi_intranet_backend.infrastructure.levis.dao;

import com.levi.levi_intranet_backend.domain.levis.BodegasJumbo;
import com.levi.levi_intranet_backend.domain.levis.SucursalesExito;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class BodegasJumboDao {
    private final NamedParameterJdbcTemplate jdbc;

    public BodegasJumboDao(@Qualifier("levisJdbc") NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    private static final RowMapper<BodegasJumbo> MAPPER = new RowMapper<BodegasJumbo>() {
        @Override
        public BodegasJumbo mapRow(ResultSet rs, int rowNum) throws SQLException {
            BodegasJumbo bj = new BodegasJumbo();
            bj.setIdBodega(rs.getString("idBodega"));
            bj.setDireccion(String.valueOf(rs.getString("direccion")));
            bj.setNombre(rs.getString("nombre"));
            bj.setTelefonos(rs.getString("telefonos"));

            return bj;
        }
    };

    public Map<String, BodegasJumbo> findAllBodegas() {
        String sql = "SELECT id_bodega as idBodega, nombre, direccion, telefonos FROM Tbl_bodegas_jumbo";
        List<BodegasJumbo> bodegas = jdbc.query(sql,
                new BeanPropertyRowMapper<>(BodegasJumbo.class));
        return bodegas.stream()
                .collect(Collectors.toMap(b -> b.getIdBodega().trim(), b -> b));
    }

}
