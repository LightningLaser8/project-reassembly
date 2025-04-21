class Throwable extends Item {
  bullet = {};
  spread = 10;
  throwEffect = "none";
  _cachedTooltip = "";
  useInAir(holder, stack) {
    this.throw(holder, stack);
    ui.waitingForMouseUp = true;
    return true;
  }
  /**@param {Entity} from @param {ItemStack} stack */
  throw(from, stack) {
    stack.count--;
    let offX = Math.cos(from.directionRad) * from.size,
      offY = Math.sin(from.directionRad) * from.size;
    from.emit(this.throwEffect, offX, offY);
    patternedBulletExpulsion(
      from.x + offX,
      from.y + offY,
      this.bullet,
      1,
      from.direction,
      this.spread,
      0,
      from.world,
      from
    );
  }
  getInformativeTooltip() {
    if (!this._cachedTooltip)
      this._cachedTooltip = [
        "🟨 ---- Throwable ----- ⬜",
        this.spread ? this.spread + "° inaccuracy" : "",
        ...Weapon.getBulletInfo(this.bullet),
        "🟨 -------------------- ⬜",
      ];
    return this._cachedTooltip;
  }
}
