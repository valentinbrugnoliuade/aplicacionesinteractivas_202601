package com.uade.tpejemplo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
public class CobranzaResponse {

    private Long id;
    private Long idCredito;
    private Integer idCuota;
    private BigDecimal importe;
}
