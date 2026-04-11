package com.uade.tpejemplo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "cuotas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cuota {

    @EmbeddedId
    private CuotaId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("idCredito")
    @JoinColumn(name = "id_credito")
    private Credito credito;

    @NotNull
    @Column(name = "fecha_vencimiento", nullable = false)
    private LocalDate fechaVencimiento;

    // Getters
    public CuotaId getId() { return id; }
    public Credito getCredito() { return credito; }
    public LocalDate getFechaVencimiento() { return fechaVencimiento; }

    // Setters
    public void setId(CuotaId id) { this.id = id; }
    public void setCredito(Credito credito) { this.credito = credito; }
    public void setFechaVencimiento(LocalDate fechaVencimiento) { this.fechaVencimiento = fechaVencimiento; }
}
