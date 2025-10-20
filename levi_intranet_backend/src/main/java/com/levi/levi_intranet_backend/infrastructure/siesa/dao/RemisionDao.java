package com.levi.levi_intranet_backend.infrastructure.siesa.dao;

import com.levi.levi_intranet_backend.domain.siesa.Remisiones;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class RemisionDao {
    private final NamedParameterJdbcTemplate jdbc;

    public RemisionDao(@Qualifier("siesaJdbc") NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    private static final RowMapper<Remisiones> MAPPER = (rs, rowNum) -> {
        Remisiones r = new Remisiones();

        r.setCedi(rs.getString("cedi"));
        r.setDescripcion(rs.getString("descripcion"));
        r.setCantidad(rs.getInt("cantidad"));
        r.setOC(rs.getString("OC"));
        r.setDireccion(rs.getString("direccion"));
        r.setReferencia(rs.getString("Referencia"));
        r.setProducto(rs.getInt("Producto"));
        r.setTalla(rs.getString("talla"));
        r.setFechaExp(rs.getString("FechaExp"));
        r.setTelefono(rs.getString("telefono"));
        r.setNumeroDoc(rs.getString("NumeroDoc"));

        return r;
    };

    public List<Remisiones> findRemisionByConsecutivo(int consecutivo) {
        String sql = "EXEC dbo.sp_InfoRQIJumbo @CONSECDOCTO = :consec";
        Map<String, Object> params = Map.of("consec", consecutivo);
        return jdbc.query(sql, params, MAPPER);
    }

    public List<Remisiones> findRemisiones(String[] consecutivos) {

        String conditionalQueryPart = String.join(" OR enca_req.f440_consec_docto = ", consecutivos);

        String sql = """
            SELECT e.f350_consec_docto AS NumeroDoc,
                   '' AS FechaExp,
                   i.f120_id AS Producto,
                   ie.f121_id_ext2_detalle AS talla,
                   i.f120_referencia AS referencia,
                   i.f120_descripcion AS descripcion,
                   SUM(m.f470_cant_1) AS cantidad,
                   bod.f150_id AS idBodega,
                   e.f350_notas AS OC
            FROM t350_co_docto_contable e
            INNER JOIN t470_cm_movto_invent m
              ON e.f350_rowid = m.f470_rowid_docto
             AND e.f350_id_cia = m.f470_id_cia
             AND m.f470_id_instalacion = '001'
            INNER JOIN t441_movto_req_int req
              ON m.f470_rowid_movto_req_int = req.f441_rowid
             AND m.f470_id_cia = req.f441_id_cia
            INNER JOIN t440_docto_req_int enca_req
              ON req.f441_rowid_docto_req_int = enca_req.f440_rowid
             AND req.f441_id_cia = enca_req.f440_id_cia
            INNER JOIN t121_mc_items_extensiones ie
              ON ie.f121_rowid = m.f470_rowid_item_ext
             AND ie.f121_id_cia = m.f470_id_cia
            INNER JOIN t120_mc_items i
              ON i.f120_rowid = ie.f121_rowid_item
             AND i.f120_id_cia = ie.f121_id_cia
            INNER JOIN t150_mc_bodegas bod
              ON enca_req.f440_rowid_bodega_ent = bod.f150_rowid
            INNER JOIN t285_co_centro_op t
              ON bod.f150_id_co = t.f285_id
             AND t.f285_id_cia = 1
            WHERE enca_req.f440_id_tipo_docto = 'rqi'
              AND enca_req.f440_consec_docto =
            """ + conditionalQueryPart

                     + """
              AND e.f350_id_cia = 1
            GROUP BY e.f350_consec_docto, i.f120_id, ie.f121_id_ext2_detalle,
                     bod.f150_id,
                     i.f120_referencia, i.f120_descripcion,
                     enca_req.f440_rowid_bodega_ent, e.f350_notas
            """;

        return jdbc.query(sql,
                new BeanPropertyRowMapper<>(Remisiones.class));
    }

}
