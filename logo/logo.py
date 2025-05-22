import matplotlib.pyplot as plt
from numpy import linspace, cos
import numpy as np

fig, ax = plt.subplots()

x1 = linspace(-0.5, 0.5, 20)
y1 = cos(1.5 * x1)
plt.plot(x1, y1 - 0.7315, color = "black", lw=5)

x2 = linspace(-0.5, 0.5, 20)
y2 = -cos(1.5 * x2)
plt.plot(x2, y2 + 0.7315, color = "black", lw=5)

x = np.linspace(-0.22, 0.22, 100)
plt.plot(x, 0.15 * cos(6 * x) ** 3 * np.cos(60 * x), color = "firebrick", lw=2.5, zorder=4)

rect_width = 1.1
rect_height = 0.125

rect_x = -rect_width / 2
rect_y = -rect_height / 2

rect = plt.Rectangle((rect_x, rect_y), rect_width, rect_height, color='white', zorder=3)
ax.add_patch(rect)

circle = plt.Circle((0, 0), 0.23, color='black', zorder=3)
ax.add_patch(circle)

plt.xlim(-0.6, 3)

# fontname = 'Ubuntu Mono'
fontname = 'Anta'

plt.text(0.575, 0, "light", fontsize=62, fontweight='bold', va='center', color='black', fontname=fontname)

plt.text(0.6, 0, "lighteye", fontsize=62, fontweight='bold', va='center', color='firebrick', fontname=fontname)

plt.text(0.6 + 1.25, 0, "eye", fontsize=62, fontweight='bold', va='center', color = 'black', fontname=fontname)

plt.gca().set_aspect('equal')
plt.axis('off')
plt.ylim(-0.325, 0.325)
plt.savefig("logo.svg", format="svg", bbox_inches='tight', pad_inches=0)  # Save as SVG
plt.show()
