package com.levi.levi_intranet_backend.infrastructure.siesa.dao;

import com.levi.levi_intranet_backend.domain.siesa.Items;
import com.levi.levi_intranet_backend.domain.siesa.ItemsEtiquetas;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public class ItemDao {
    private final NamedParameterJdbcTemplate jdbc;

    public ItemDao(NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    private static final RowMapper<Items> MAPPER = new RowMapper<Items>() {
        @Override
        public Items mapRow(ResultSet rs, int rowNum) throws SQLException {
            Items i = new Items();

            i.setIdCia(rs.getShort("idCia"));
            i.setId(rs.getInt("id"));
            i.setRowId(rs.getInt("rowId"));
            i.setReferencia(rs.getString("referencia"));
            i.setDescripcion(rs.getString("descripcion"));
            i.setDescripcionCorta(rs.getString("descripcionCorta"));
            i.setIdGrupoImpositivo(rs.getString("idGrupoImpositivo"));
            i.setIdTipoInvServ(rs.getString("idTipoInvServ"));
            i.setIdGrupoDscto(rs.getString("idGrupoDscto"));
            i.setIndTipoItem(rs.getShort("indTipoItem"));
            i.setIndCompra(rs.getShort("indCompra"));
            i.setIndVenta(rs.getShort("indVenta"));
            i.setIndManufactura(rs.getShort("indManufactura"));
            i.setIndListaPreciosExt(rs.getShort("indListaPreciosExt"));
            i.setIndLote(rs.getShort("indLote"));
            i.setIndLoteAsignacion(rs.getShort("indLoteAsignacion"));
            i.setIndSobrecostos(rs.getShort("indSobrecostos"));
            i.setVidaUtil(rs.getShort("vidaUtil"));
            i.setRowIdTerceroProv(rs.getInt("rowIdTerceroProv"));
            i.setIdSucursalProv(rs.getString("idSucursalProv"));
            i.setRowIdTerceroCli(rs.getInt("rowIdTerceroCli"));
            i.setIdSucursalCli(rs.getString("idSucursalCli"));
            i.setIdUnidadInventario(rs.getString("idUnidadInventario"));
            i.setIdUnidadAdicional(rs.getString("idUnidadAdicional"));
            i.setIdUnidadOrden(rs.getString("idUnidadOrden"));
            i.setIdUnidadEmpaque(rs.getString("idUnidadEmpaque"));
            i.setIdDescripcionTecnica(rs.getString("idDescripcionTecnica"));
            i.setIdExtension1(rs.getString("idExtension1"));
            i.setIdExtension2(rs.getString("idExtension2"));
            i.setRowIdFoto(rs.getInt("rowIdFoto"));
            i.setNotas(rs.getString("notas"));
            i.setIdSegmentoCosto(rs.getShort("idSegmentoCosto"));
            i.setUsuarioCreacion(rs.getString("usuarioCreacion"));
            i.setUsuarioActualizacion(rs.getString("usuarioActualizacion"));

            // Fechas: usa getTimestamp para mantener fecha+hora; puede ser null
            var fc = rs.getTimestamp("fechaCreacion");
            if (fc != null) i.setFechaCreacion(new java.util.Date(fc.getTime()));
            var fa = rs.getTimestamp("fechaActualizacion");
            if (fa != null) i.setFechaActualizacion(new java.util.Date(fa.getTime()));

            i.setIndSerial(rs.getShort("indSerial"));
            i.setIndCfgSerial(rs.getString("indCfgSerial"));
            i.setIndPaquete(rs.getShort("indPaquete"));
            i.setRowIdMovtoEntidad(rs.getInt("rowIdMovtoEntidad"));
            i.setIndExento(rs.getShort("indExento"));
            i.setIndVentaInterno(rs.getShort("indVentaInterno"));
            i.setIndGenerico(rs.getShort("indGenerico"));
            i.setIndGumUnificado(rs.getShort("indGumUnificado"));
            i.setIdUnidadPrecio(rs.getString("idUnidadPrecio"));
            i.setIndControlado(rs.getShort("indControlado"));

            return i;
        }
    };

    private static final RowMapper<ItemsEtiquetas> MAPPER_ETIQUETAS = new RowMapper<ItemsEtiquetas>() {
        @Override
        public ItemsEtiquetas mapRow(ResultSet rs, int rowNum) throws SQLException {
            ItemsEtiquetas i = new ItemsEtiquetas();

            i.setIdCia(rs.getShort("idCia"));
            i.setId(rs.getInt("id"));
            i.setRowId(rs.getInt("rowId"));
            i.setReferencia(rs.getString("referencia"));
            i.setDescripcion(rs.getString("descripcion"));
            i.setCodigoBarra(rs.getString("codigoBarra"));
            i.setExtension1(rs.getString("extension1"));
            i.setExtension2(rs.getString("extension2"));
            i.setIdListaPrecio(rs.getShort("idListaPrecio"));
            i.setPrecio(rs.getString("precio"));

            return i;
        }
    };

    public Optional<Items> findItemById(int id) {
        var sql = """
                SELECT [f120_id_cia]                 as idCia,
                       [f120_id]                     as id,
                       [f120_rowid]                  as rowId,
                       [f120_referencia]             as referencia,
                       [f120_descripcion]            as descripcion,
                       [f120_descripcion_corta]      as descripcionCorta,
                       [f120_id_grupo_impositivo]    as idGrupoImpositivo,
                       [f120_id_tipo_inv_serv]       as idTipoInvServ,
                       [f120_id_grupo_dscto]         as idGrupoDscto,
                       [f120_ind_tipo_item]          as indTipoItem,
                       [f120_ind_compra]             as indCompra,
                       [f120_ind_venta]              as indVenta,
                       [f120_ind_manufactura]        as indManufactura,
                       [f120_ind_lista_precios_ext]  as indListaPreciosExt,
                       [f120_ind_lote]               as indLote,
                       [f120_ind_lote_asignacion]    as indLoteAsignacion,
                       [f120_ind_sobrecostos]        as indSobrecostos,
                       [f120_vida_util]              as vidaUtil,
                       [f120_rowid_tercero_prov]     as rowIdTerceroProv,
                       [f120_id_sucursal_prov]       as idSucursalProv,
                       [f120_rowid_tercero_cli]      as rowIdTerceroCli,
                       [f120_id_sucursal_cli]        as idSucursalCli,
                       [f120_id_unidad_inventario]   as idUnidadInventario,
                       [f120_id_unidad_adicional]    as idUnidadAdicional,
                       [f120_id_unidad_orden]        as idUnidadOrden,
                       [f120_id_unidad_empaque]      as idUnidadEmpaque,
                       [f120_id_descripcion_tecnica] as idDescripcionTecnica,
                       [f120_id_extension1]          as idExtension1,
                       [f120_id_extension2]          as idExtension2,
                       [f120_rowid_foto]             as rowIdFoto,
                       [f120_notas]                  as notas,
                       [f120_id_segmento_costo]      as idSegmentoCosto,
                       [f120_usuario_creacion]       as usuarioCreacion,
                       [f120_usuario_actualizacion]  as usuarioActualizacion,
                       [f120_fecha_creacion]         as fechaCreacion,
                       [f120_fecha_actualizacion]    as fechaActualizacion,
                       [f120_ind_serial]             as indSerial,
                       [f120_id_cfg_serial]          as indCfgSerial,
                       [f120_ind_paquete]            as indPaquete,
                       [f120_rowid_movto_entidad]    as rowIdMovtoEntidad,
                       [f120_ind_exento]             as indExento,
                       [f120_ind_venta_interno]      as indVentaInterno,
                       [f120_ind_generico]           as indGenerico,
                       [f120_ind_gum_unificado]      as indGumUnificado,
                       [f120_id_unidad_precio]       as idUnidadPrecio,
                       [f120_ind_controlado]         as indControlado
                FROM [UnoEE_Levistrauss_Real].[dbo].[t120_mc_items]
                WHERE f120_id = :Id
                AND f120_id_cia = :Compania
                """;
        var params = Map.of(
                "Id", Integer.toString(id),
                "Compania", "1"
        );
        var list = jdbc.query(sql, params, MAPPER);
        return list.stream().findFirst();
    }


    public List<ItemsEtiquetas> findItemsById(int id, String listaPrecio, String compania) {
        var sql = """
                SELECT t120_mc_items.f120_id as id,
                       t120_mc_items.f120_referencia as referencia,
                       t120_mc_items.f120_descripcion as descripcion, 
                       t121_mc_items_extensiones.f121_id_ext1_detalle as extension1, 
                       t121_mc_items_extensiones.f121_id_ext2_detalle as extension2, 
                       t131_mc_items_barras.f131_id as codigoBarra, 
                       t120_mc_items.f120_id_cia as idCia, 
                       t126_mc_items_precios.f126_id_lista_precio as idListaPrecio, 
                       t120_mc_items.f120_rowid as rowId, 
                       t126_mc_items_precios.f126_precio as precio, 
                       t126_mc_items_precios.f126_fecha_activacion as fechaActivacion, 
                       t126_mc_items_precios.f126_fecha_inactivacion as  fechaInactivacion, 
                       t121_mc_items_extensiones.f121_id_cia as idCiaExtension
                FROM t120_mc_items
                INNER JOIN t121_mc_items_extensiones 
                    ON t120_mc_items.f120_rowid = t121_mc_items_extensiones.f121_rowid_item 
                   AND t120_mc_items.f120_id_cia = t121_mc_items_extensiones.f121_id_cia 
                   AND t121_mc_items_extensiones.f121_id_cia = :Compania
                   AND t120_mc_items.f120_id = :Id
                INNER JOIN t126_mc_items_precios 
                    ON t120_mc_items.f120_rowid = t126_mc_items_precios.f126_rowid_item 
                   AND t120_mc_items.f120_id_cia = t126_mc_items_precios.f126_id_cia 
                   AND t126_mc_items_precios.f126_id_lista_precio = :ListaPrecio
                INNER JOIN (
                    SELECT MAX(f126_fecha_activacion) AS maxfecha, 
                           f126_rowid_item, 
                           f126_id_lista_precio 
                    FROM dbo.t126_mc_items_precios 
                    GROUP BY f126_rowid_item, f126_id_lista_precio
                ) b 
                    ON t126_mc_items_precios.f126_rowid_item = b.f126_rowid_item 
                   AND b.maxfecha = t126_mc_items_precios.f126_fecha_activacion 
                   AND b.f126_id_lista_precio = t126_mc_items_precios.f126_id_lista_precio
                INNER JOIN t131_mc_items_barras 
                    ON t121_mc_items_extensiones.f121_rowid = t131_mc_items_barras.f131_rowid_item_ext 
                   AND t121_mc_items_extensiones.f121_id_cia = t131_mc_items_barras.f131_id_cia
                """;

        // 🔹 Pasar todos los parámetros nombrados
        var params = Map.of(
                "Id", Integer.toString(id),
                "ListaPrecio", listaPrecio,
                "Compania", compania
        );

        return jdbc.query(sql, params, MAPPER_ETIQUETAS);
    }

    public List<ItemsEtiquetas> findItemsByIds(String[] ids, String compania) {
        String conditionalQueryPart = String.join(",", ids);
        var sql = """
                SELECT i.f120_id                 AS id,
                i.f120_referencia         AS referencia,
                i.f120_descripcion        AS descripcion,
                e.f121_id_ext1_detalle    AS extension1,
                e.f121_id_ext2_detalle    AS extension2,
                brr.f131_id               AS codigoBarra,
                i.f120_id_cia             AS idCia,
                p.f126_id_lista_precio    AS idListaPrecio,
                i.f120_rowid              AS rowId,
                p.f126_precio             AS precio,
                p.f126_fecha_activacion   AS fechaActivacion,
                p.f126_fecha_inactivacion AS fechaInactivacion,
                e.f121_id_cia             AS idCiaExtension
                FROM t120_mc_items AS i
                INNER JOIN t121_mc_items_extensiones AS e
                           ON i.f120_rowid = e.f121_rowid_item
                               AND i.f120_id_cia = e.f121_id_cia
                INNER JOIN t126_mc_items_precios AS p
                           ON i.f120_rowid = p.f126_rowid_item
                               AND i.f120_id_cia = p.f126_id_cia
                               AND p.f126_id_lista_precio = :ListaPrecio
                INNER JOIN (SELECT MAX(f126_fecha_activacion) AS maxfecha,
                                   f126_rowid_item,
                                   f126_id_lista_precio
                            FROM dbo.t126_mc_items_precios
                            GROUP BY f126_rowid_item, f126_id_lista_precio) AS ult
                           ON p.f126_rowid_item = ult.f126_rowid_item
                               AND p.f126_fecha_activacion = ult.maxfecha
                               AND p.f126_id_lista_precio = ult.f126_id_lista_precio
                INNER JOIN t131_mc_items_barras AS brr
                          ON e.f121_rowid = brr.f131_rowid_item_ext
                              AND e.f121_id_cia = brr.f131_id_cia
                WHERE e.f121_id_cia = :Compania
                AND i.f120_id IN (""" + conditionalQueryPart + ");";

        // 🔹 Pasar todos los parámetros nombrados
        var params = Map.of(
                "ListaPrecio", "01",
                "Compania", compania
        );

        return jdbc.query(sql, params, MAPPER_ETIQUETAS);
    }

    public List<ItemsEtiquetas> findItemsByCodigoBarra(String codigoBarra, String listaPrecio, String compania) {
        var sql = """
                SELECT
                    t120_mc_items.f120_id as id, 
                    t120_mc_items.f120_referencia as referencia, 
                    t120_mc_items.f120_descripcion as descripcion,
                    t121_mc_items_extensiones.f121_id_ext1_detalle as extension1,
                    t121_mc_items_extensiones.f121_id_ext2_detalle as  extension2,
                    t131_mc_items_barras.f131_id as codigoBarra,
                    t120_mc_items.f120_id_cia as idCia, 
                    t126_mc_items_precios.f126_id_lista_precio as idListaPrecio,
                    t120_mc_items.f120_rowid as rowId,
                    t126_mc_items_precios.f126_precio as precio, 
                    t126_mc_items_precios.f126_fecha_activacion as fechaActivacion,
                    t126_mc_items_precios.f126_fecha_inactivacion as fechaInactivacion,
                    t121_mc_items_extensiones.f121_id_cia as idCiaExtension
                    FROM  t120_mc_items
                    INNER JOIN
                    t121_mc_items_extensiones ON t120_mc_items.f120_rowid = t121_mc_items_extensiones.f121_rowid_item
                    AND t120_mc_items.f120_id_cia = dbo.t121_mc_items_extensiones.f121_id_cia AND t121_mc_items_extensiones.f121_id_cia = :Compania
                    INNER JOIN
                    t126_mc_items_precios ON t120_mc_items.f120_rowid = t126_mc_items_precios.f126_rowid_item
                    AND t120_mc_items.f120_id_cia = t126_mc_items_precios.f126_id_cia  AND t126_mc_items_precios.f126_id_lista_precio = :ListaPrecio
                    INNER JOIN (SELECT MAX(f126_fecha_activacion) AS maxfecha,f126_rowid_item,f126_id_lista_precio
                FROM dbo.t126_mc_items_precios
                GROUP BY f126_rowid_item,f126_id_lista_precio)
                b ON t126_mc_items_precios.f126_rowid_item = b.f126_rowid_item AND b.maxfecha=t126_mc_items_precios.f126_fecha_activacion
                and b.f126_id_lista_precio = t126_mc_items_precios.f126_id_lista_precio
                    LEFT OUTER JOIN
                    t131_mc_items_barras ON t121_mc_items_extensiones.f121_rowid = t131_mc_items_barras.f131_rowid_item_ext\s
                    AND t121_mc_items_extensiones.f121_id_cia = t131_mc_items_barras.f131_id_cia
                    WHERE t131_mc_items_barras.f131_id = :CodigoBarra
                """;

        // 🔹 Pasar todos los parámetros nombrados
        var params = Map.of(
                "CodigoBarra", codigoBarra,
                "ListaPrecio", listaPrecio,
                "Compania", compania
        );

        return jdbc.query(sql, params, MAPPER_ETIQUETAS);
    }

    public List<Items> findAllItems() {
        var sql = "SELECT TOP 1000 [f120_id_cia] as idCia ,[f120_id] as id ,[f120_rowid] as rowId ,[f120_referencia] as referencia ,[f120_descripcion] as descripcion ,[f120_descripcion_corta] as descripcionCorta,[f120_id_grupo_impositivo] as idGrupoImpositivo ,[f120_id_tipo_inv_serv] as idTipoInvServ ,[f120_id_grupo_dscto] as idGrupoDscto ,[f120_ind_tipo_item] as indTipoItem ,[f120_ind_compra] as indCompra, [f120_ind_venta] as indVenta ,[f120_ind_manufactura]  as indManufactura, [f120_ind_lista_precios_ext] as indListaPreciosExt, [f120_ind_lote] as indLote ,[f120_ind_lote_asignacion] as indLoteAsignacion ,[f120_ind_sobrecostos] as indSobrecostos,[f120_vida_util] as vidaUtil ,[f120_rowid_tercero_prov] as rowIdTerceroProv,[f120_id_sucursal_prov] as idSucursalProv ,[f120_rowid_tercero_cli] as rowIdTerceroCli ,[f120_id_sucursal_cli] as idSucursalCli, [f120_id_unidad_inventario] as idUnidadInventario, [f120_id_unidad_adicional] as idUnidadAdicional,[f120_id_unidad_orden] as idUnidadOrden, [f120_id_unidad_empaque] as idUnidadEmpaque, [f120_id_descripcion_tecnica] as idDescripcionTecnica,[f120_id_extension1] as idExtension1, [f120_id_extension2] as idExtension2, [f120_rowid_foto] as rowIdFoto, [f120_notas] as notas,[f120_id_segmento_costo] as idSegmentoCosto, [f120_usuario_creacion] as usuarioCreacion, [f120_usuario_actualizacion] as usuarioActualizacion,[f120_fecha_creacion] as fechaCreacion, [f120_fecha_actualizacion] as fechaActualizacion, [f120_ind_serial] as indSerial, [f120_id_cfg_serial] as indCfgSerial , [f120_ind_paquete] as indPaquete, [f120_rowid_movto_entidad] as rowIdMovtoEntidad, [f120_ind_exento] as indExento,[f120_ind_venta_interno] as indVentaInterno, [f120_ind_generico] as indGenerico ,[f120_ind_gum_unificado] as indGumUnificado,[f120_id_unidad_precio] as idUnidadPrecio, [f120_ind_controlado] as indControlado FROM [UnoEE_Levistrauss_Real].[dbo].[t120_mc_items] ORDER BY f120_id DESC";

        var list = jdbc.query(sql, MAPPER);
        return list;
    }

}