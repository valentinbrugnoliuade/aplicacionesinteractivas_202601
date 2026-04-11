package com.uade.tpejemplo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class CuotaResponse {

    private Long idCredito;
    private Integer idCuota;
    private LocalDate fechaVencimiento;
    private boolean pagada;
}
