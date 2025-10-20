package com.levi.levi_intranet_backend.infrastructure.levis.dao;

import com.levi.levi_intranet_backend.domain.levis.SucursalesExito;
import com.levi.levi_intranet_backend.domain.siesa.Items;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public class SucursalExitoDao {
    private final NamedParameterJdbcTemplate jdbc;

    public SucursalExitoDao(@Qualifier("levisJdbc") NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    private static final RowMapper<SucursalesExito> MAPPER = new RowMapper<SucursalesExito>() {
        @Override
        public SucursalesExito mapRow(ResultSet rs, int rowNum) throws SQLException {
            SucursalesExito s = new SucursalesExito();
            s.id = rs.getInt("id");
            s.idUnoee = rs.getString("idUnoee");
            s.idExito = rs.getString("idExito");
            s.idCC = rs.getString("idCC");
            s.idBodega = rs.getString("idBodega");
            s.descripcion = rs.getString("descripcion");
            return s;
        }
    };

    public Optional<SucursalesExito> findSucursalExitoById(int id) {
        var sql = "SELECT [ID] as id ,[Descripcion] as descripcion,[ID_Exito] as idExito, [ID_Unoee] as idUnoee ,[ID_CC] as idCC , [ID_Bodega] as idBodega FROM tblSucursalesExito WHERE ID = :Id";
        var params = Map.of("Id", Integer.toString(id));
        var list = jdbc.query(sql, params, MAPPER);
        return list.stream().findFirst();
    }

    public List<SucursalesExito> findAllSucursalesExito() {
        var sql = "SELECT [ID] as id ,[Descripcion] as descripcion, [ID_Exito] as idExito, [ID_Unoee] as idUnoee ,[ID_CC] as idCC , [ID_Bodega] as idBodega FROM tblSucursalesExito";
        var list = jdbc.query(sql, MAPPER);
        return list;
    }

}
