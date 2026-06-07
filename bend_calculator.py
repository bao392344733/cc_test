#!/usr/bin/env python3
"""钣金折弯系数计算器 — 全量工艺参数表输出"""

import math
from typing import Optional

# ============================================================
# 1. 配置层 — 工艺参数
# ============================================================

THICKNESSES = [1.0, 1.2, 1.5, 2.0, 2.5, 3.0, 5.0]

# K 因子: (min, max) -> K
K_FACTOR_RULES = [
    ((1.0, 1.5), 0.25),
    ((2.0, 5.0), 0.23),
]

# 直角 (90°) 固定折弯扣除 BD (mm)
RIGHT_ANGLE_BD = {
    1.0: 1.7,
    1.2: 2.0,
    1.5: 2.5,
    2.0: 3.3,
    2.5: 4.3,
    3.0: 5.0,
    5.0: 8.5,
}

OBTUSE_ANGLES = [120, 135, 150]       # 钝角角度
ARC_R_MULTS = [5, 6, 8, 10]           # 圆弧折弯 R 倍数 (≥5T)

# ============================================================
# 2. 计算层 — 纯函数
# ============================================================

def get_k_factor(t: float) -> float:
    for (lo, hi), k in K_FACTOR_RULES:
        if lo <= t <= hi:
            return k
    raise ValueError(f"未定义板厚 {t}mm 的 K 因子")

def get_bd(t: float) -> float:
    return RIGHT_ANGLE_BD[t]

def calc_obtuse_ba(t: float, angle_deg: float, r_inner: float) -> float:
    """钝角折弯系数 BA = θ(rad) × (R_inner + K × T)"""
    k = get_k_factor(t)
    return math.radians(angle_deg) * (r_inner + k * t)

def calc_arc_ba(t: float, r_inner: float) -> float:
    """圆弧折弯系数 BA = 0.5 × π × (R_inner + 0.5T)"""
    return 0.5 * math.pi * (r_inner + 0.5 * t)

def calc_dead_edge_ba(t: float) -> float:
    """压死边折弯系数 BA = 1.5 × T"""
    return 1.5 * t

# ============================================================
# 3. 输出层 — 表格绘制
# ============================================================

def sep(widths: list[int]):
    print("+" + "+".join("-" * w for w in widths) + "+")

def row(cells: list[str], widths: list[int], aligns: Optional[list[str]] = None):
    if aligns is None:
        aligns = ["<"] * len(cells)
    parts = [f"{c:^{w}}" if a == "^" else f"{c:>{w}}" if a == ">" else f"{c:<{w}}"
             for c, w, a in zip(cells, widths, aligns)]
    print("|" + "|".join(parts) + "|")

def header(title: str):
    print()
    print("=" * 78)
    print(f"  {title}")
    print("=" * 78)

# ---- 表 1: 直角折弯扣除 ----
def print_table_right_angle():
    header("表 1: 直角折弯 (90°) — 固定折弯扣除 BD")
    w = [16, 22, 18]
    sep(w)
    row(["板厚 T (mm)", "折弯扣除 BD (mm)", "计算方式"], w, ["^", "^", "^"])
    sep(w)
    for t in THICKNESSES:
        bd = get_bd(t)
        row([f"{t:.1f}", f"{bd:.2f}", "查表固定值"], w, ["^", "^", "^"])
        sep(w)

# ---- 表 2: 钝角折弯系数 ----
def print_table_obtuse():
    header("表 2: 钝角折弯 (>90°) — 折弯系数 BA (K 因子法, 默认内 R = T)")
    n = len(OBTUSE_ANGLES)
    cw = 21
    w = [16] + [cw] * n + [14]
    sep(w)
    row(["板厚 T \\ 角度"] + [f"{a}°" for a in OBTUSE_ANGLES] + ["K 因子"],
        w, ["^"] * (n + 2))
    sep(w)
    for t in THICKNESSES:
        k = get_k_factor(t)
        r_inner = t
        cells = [f"  {t:.1f} mm"]
        for a in OBTUSE_ANGLES:
            ba = calc_obtuse_ba(t, a, r_inner)
            cells.append(f"BA = {ba:.3f}")
        cells.append(f"K={k:.2f}")
        row(cells, w, ["<"] + ["^"] * n + ["^"])
        sep(w)
    print("  公式: BA = θ(rad) × (R_inner + K × T)  |  默认内 R = T")

# ---- 表 3: 圆弧折弯系数 ----
def print_table_arc():
    header("表 3: 圆弧折弯 (内 R ≥ 5T) — 折弯系数 BA")
    n = len(ARC_R_MULTS)
    cw = 20
    w = [16] + [cw] * n
    sep(w)
    row(["板厚 T \\ R 倍数"] + [f"R = {m}T" for m in ARC_R_MULTS],
        w, ["^"] * (n + 1))
    sep(w)
    for t in THICKNESSES:
        cells = [f"  {t:.1f} mm"]
        for m in ARC_R_MULTS:
            ba = calc_arc_ba(t, m * t)
            cells.append(f"BA = {ba:.3f}")
        row(cells, w, ["<"] + ["^"] * n)
        sep(w)
    print("  公式: BA = 0.5 × π × (R_inner + 0.5T)")

# ---- 表 4: 压死边折弯系数 ----
def print_table_dead_edge():
    header("表 4: 压死边 (褶边特征) — 折弯系数 BA")
    w = [16, 22, 22]
    sep(w)
    row(["板厚 T (mm)", "折弯系数 BA (mm)", "计算方式"], w, ["^", "^", "^"])
    sep(w)
    for t in THICKNESSES:
        ba = calc_dead_edge_ba(t)
        row([f"{t:.1f}", f"BA = {ba:.2f}", "公式 BA = 1.5 × T"], w, ["^", "^", "^"])
        sep(w)

# ============================================================
# 4. 主入口
# ============================================================

def main():
    print()
    print("=" * 78)
    print("   钣金折弯系数计算器 — 全量工艺参数表")
    print("   材料: 冷轧钢 / 不锈钢  |  板厚范围: 1.0 ~ 5.0 mm")
    print("=" * 78)

    print_table_right_angle()
    print_table_obtuse()
    print_table_arc()
    print_table_dead_edge()

    print()
    print("=" * 78)
    print("  计算完毕。以上数据基于工程标准公式，实际加工请结合模具验证。")
    print("=" * 78)
    print()

if __name__ == "__main__":
    main()
