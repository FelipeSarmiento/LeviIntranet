package com.levi.levi_intranet_backend.infrastructure.siesa.dao;

import com.levi.levi_intranet_backend.domain.siesa.CentroCostosSiesa;
import com.levi.levi_intranet_backend.domain.siesa.TipoInventarios;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Repository
public class TipoInventarioDao {
    private final NamedParameterJdbcTemplate jdbc;

    public TipoInventarioDao(NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    private static final RowMapper<TipoInventarios> MAPPER = new RowMapper<TipoInventarios>() {
        @Override
        public TipoInventarios mapRow(ResultSet rs, int rowNum) throws SQLException {
            TipoInventarios ti = new TipoInventarios();
            ti.setIdTipoInventario(rs.getString("idTipoInventario"));
            ti.setDescripcion(rs.getString("descripcion"));
            return ti;
        }
    };

    public List<TipoInventarios> findTipoInventariosByCentroCosto(String idCentroCosto, String compania) {
        var sql = """
                select 
                af.f262_id_tipo_inv_serv as idTipoInventario,
                ti.f149_descripcion as descripcion
                from t262_af_activos_fijos  af
                inner join t149_mc_tipo_inv_serv ti
                on af.f262_id_tipo_inv_serv = ti.f149_id and af.f262_id_cia = ti.f149_id_cia
                where af.f262_id_cia = :compania  and f262_rowid_ccosto = :idCentroCosto
                group by af.f262_id_tipo_inv_serv, ti.f149_descripcion
                """;
        var params = Map.of("idCentroCosto", idCentroCosto, "compania", compania);
        var list = jdbc.query(sql, params, MAPPER);
        return list;
    }

}