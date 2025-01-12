---
title: "Publications"
author: ""
type: ""
date: 2024-05-03T11:23:38+03:00
subtitle: ""
image: ""
tags: []
---

# 2025

{{< publication
    title="Entropy Scaling of Viscosity IV ─ Application to 124 Industrially Important Fluids"
    authors="V. Martinek, I. Bell, R. Herzog, M. Richter, & X. Yang"
    journal="Journal of Chemical & Engineering Data"
    year="2025"
    doi="https://doi.org/10.1021/acs.jced.4c00451"
    bib="/publications/res4_paper.bib"
    abstract="In our previous work [Yang, X. J. Chem. Eng. Data 2021, 66, 1385–1398], a residual entropy scaling (RES) approach was developed to link viscosity to residual entropy using a 4-term power function for 39 refrigerants. In further research [Yang, X. Int. J. Thermophys. 2022, 43, 183], this RES approach was extended to 124 pure fluids containing fluids from light gases (hydrogen and helium) to dense fluids (e.g., heavy hydrocarbons) and fluids with strong association force (e.g., water). In these previous research studies, the model was developed by manual optimization of the power function. The average absolute relative deviation (AARD) of experimental data from the RES model is approximately 3.36%, which is higher than the 2.74% obtained with the various models in REFPROP 10.0. In the present work, the power function was optimized by iteratively fitting the global (fluid-independent power terms) and local parameters (fluid-specific and group-specific parameters) and screening the experimental data. The resulting equation has only three terms instead of four. Most notably, the AARD of the new RES model is reduced down to 2.76%; this is very close to the various multiparameter models in REFPROP 10.0, while the average relative deviation (ARD) amounts to 0.03%, which is smaller than REFPROP 10.0’s 0.7%. A Python package is provided for the use of the developed model."
>}}

# 2024

{{< publication
    title="Shape constraints in symbolic regression using penalized least squares"
    authors="V. Martinek, J. Reuter, O. Frotscher, S. Mostaghim, M. Richter, & R. Herzog"
    journal="ArXiv Preprint"
    year="2024"
    doi="https://doi.org/10.48550/arXiv.2405.20800"
    bib="/publications/shape_constraints.bib"
    abstract="We study the addition of shape constraints and their consideration during the parameter estimation step of symbolic regression (SR). Shape constraints serve as a means to introduce prior knowledge about the shape of the otherwise unknown model function into SR. Unlike previous works that have explored shape constraints in SR, we propose minimizing shape constraint violations during parameter estimation using gradient-based numerical optimization. We test three algorithm variants to evaluate their performance in identifying three symbolic expressions from a synthetically generated data set. This paper examines two benchmark scenarios: one with varying noise levels and another with reduced amounts of training data. The results indicate that incorporating shape constraints into the expression search is particularly beneficial when data is scarce. Compared to using shape constraints only in the selection process, our approach of minimizing violations during parameter estimation shows a statistically significant benefit in some of our test cases, without being significantly worse in any instance."
>}}

{{< publication
    title="Unit-Aware Genetic Programming for the Development of Empirical Equations"
    authors="J. Reuter, V. Martinek, R. Herzog, & S. Mostaghim"
    journal="Springer Nature Switzerland - Parallel Problem Solving from Nature -- PPSN XVIII"
    year="2024"
    doi="https://doi.org/10.1007/978-3-031-70055-2_11"
    bib="/publications/unit_aware.bib"
    abstract="When developing empirical equations, domain experts require these to be accurate and adhere to physical laws. Often, constants with unknown units need to be discovered alongside the equations. Traditional unit-aware genetic programming (GP) approaches cannot be used when unknown constants with undetermined units are included. This paper presents a method for dimensional analysis that propagates unknown units as 'jokers' and returns the magnitude of unit violations. We propose three methods, namely evolutive culling, a repair mechanism, and a multi-objective approach, to integrate the dimensional analysis in the GP algorithm. Experiments on datasets with ground truth demonstrate comparable performance of evolutive culling and the multi-objective approach to a baseline without dimensional analysis. Extensive analysis of the results on datasets without ground truth reveals that the unit-aware algorithms make only low sacrifices in accuracy, while producing unit-adherent solutions."
>}}

# 2023

{{< publication
    title="Proof of concept for fast equation of state development using an integrated experimental-computational approach"
    authors="O. Frotscher, V. Martinek, R. Fingerhut, X. Yang, J. Vrabec, R. Herzog, & M. Richter"
    journal="International Journal of Thermophysics"
    year="2023"
    volume="44"
    issue="7"
    doi="https://doi.org/10.1007/s10765-023-03197-z"
    bib="/publications/air_paper.bib"
    abstract="A multitude of industries, including energy and process engineering, as well as academia are researching and utilizing new fluid substances to further the aim of sustainability. Knowledge of the thermodynamic properties of these substances is a prerequisite, if they are to be utilized to their fullest potential. To date, the way to acquire reliable knowledge of the thermodynamic behavior is through measurements. The ensuing experimental data are then used to develop equations of state, which efficiently embody the gained knowledge of the behavior of the fluid substance, allow for interpolation and, to some extent, extrapolation. However, the acquisition of low-uncertainty experimental data, and thus the development of accurate equations of state, is often time-consuming and expensive. For substances for which suitable force field models exist, molecular modeling and simulation are well-suited to generate thermodynamic data or to augment experimental data, however, at the expense of larger uncertainties. The major goal of this work is to present a new approach for the development of equations of state using (1) symbolic regression, which is a machine learning based model development approach, (2) optimal experimental design, and (3) efficient data acquisition. We demonstrate this approach using the example of density data of an air-like binary mixture (0.2094 O2 + 0.7906 N2) over the temperature range from 100 K to 300 K at pressures of up to 8 MPa, which covers the gaseous, liquid, and supercritical regions. For this purpose, an experimental data set published by von Preetzmann et al. (Int. J. Thermophys. 42, 2021) and molecular simulation data sampled in this work are used. The two data sets are compared in terms of acquisition time, cost, and uncertainty, showing that an optimized combination of experimental and simulation data leads to lower cost while maintaining low uncertainties."
>}}

{{< publication
    title="Introducing Thermodynamics-Informed Symbolic Regression–A Tool for Thermodynamic Equations of State Development"
    authors="V. Martinek, O. Frotscher, M. Richter, & R. Herzog"
    journal="ArXiv Preprint"
    year="2023"
    doi="https://doi.org/10.48550/arXiv.2309.02805"
    bib="/publications/tisr_paper.bib"
    abstract="Thermodynamic equations of state (EOS) are essential for many industries as well as in academia. Even leaving aside the expensive and extensive measurement campaigns required for the data acquisition, the development of EOS is an intensely time-consuming process, which does often still heavily rely on expert knowledge and iterative fine-tuning. To improve upon and accelerate the EOS development process, we introduce thermodynamics-informed symbolic regression (TiSR), a symbolic regression (SR) tool aimed at thermodynamic EOS modeling. TiSR is already a capable SR tool, which was used in the research of this https URL. It aims to combine an SR base with the extensions required to work with often strongly scattered experimental data, different residual pre- and post-processing options, and additional features required to consider thermodynamic EOS development. Although TiSR is not ready for end users yet, this paper is intended to report on its current state, showcase the progress, and discuss (distant and not so distant) future directions. TiSR is available at this https URL and can be cited as this https URL."
>}}
