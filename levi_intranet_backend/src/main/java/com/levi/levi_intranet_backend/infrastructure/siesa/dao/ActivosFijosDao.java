package com.levi.levi_intranet_backend.infrastructure.siesa.dao;

import com.levi.levi_intranet_backend.domain.siesa.ActivosFijos;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;

@Repository
public class ActivosFijosDao {
    private final NamedParameterJdbcTemplate jdbc;

    public ActivosFijosDao(NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    private static final RowMapper<ActivosFijos> MAPPER = (rs, rowNum) -> {
        ActivosFijos af = new ActivosFijos();
        af.setIdActivoFijo(rs.getString("idActivoFijo"));
        af.setDescripcion(rs.getString("descripcion"));
        af.setRowIdActivoFijo(rs.getString("rowIdActivoFijo"));
        af.setIdCompania(rs.getString("idCompania"));
        af.setReferencia(rs.getString("referencia"));
        af.setCompania(rs.getString("compania"));
        af.setRowIdCentroCosto(rs.getString("rowIdCentroCosto"));
        af.setRowIdResponsable(rs.getString("rowIdResponsable"));
        af.setIdUn(rs.getString("idUn"));
        af.setRowIdMovimientoEntidad(rs.getString("rowIdMovimientoEntidad"));
        af.setMarca(rs.getString("marca"));
        af.setModelo(rs.getString("modelo"));
        af.setSerie(rs.getString("serie"));
        af.setMotor(rs.getString("motor"));
        af.setNotas(rs.getString("notas"));

        return af;
    };

    public List<ActivosFijos> findActivosFijos(String idCentroCosto, String tipoInventario, String compania) {
        var sql = """
                SELECT
                    f262_rowid as rowIdActivoFijo,
                    f262_id_cia as idCompania,
                    f262_id as idActivoFijo,
                    f262_referencia as referencia,
                    f262_descripcion as descripcion,
                    f262_id_co as compania,
                    f262_rowid_ccosto as rowIdCentroCosto,
                    f262_rowid_tercero_responsable as rowIdResponsable,
                    f262_id_un as idUn,
                    f263_rowid_movto_entidad as rowIdMovimientoEntidad,
                    SPACE(50) as marca,
                    SPACE(50) as modelo,
                    SPACE(50) as serie,
                    SPACE(50) as motor,
                    ad.f263_notas as notas
                FROM t262_af_activos_fijos  af
                INNER JOIN t263_af_activos_fijos_adicion ad
                ON af.f262_rowid = ad.f263_rowid_af
                WHERE f263_ind_estado <> 9
                AND f262_id_cia = :company
                AND f262_rowid_ccosto = :idCentroCosto
                AND f262_id_tipo_inv_serv = :tipoInventario
                """;
        var params = Map.of(
                "idCentroCosto", idCentroCosto,
                "company", compania,
                "tipoInventario", tipoInventario
        );
        return jdbc.query(sql, params, MAPPER);
    }

}