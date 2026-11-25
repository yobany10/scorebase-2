export const applyAcceptedBuzzerBuzz = ({
  seat,
  controls,
  closeAll,
  startTimer,
  setPending
}) => {
  const openWinner = controls[seat]
  if (!openWinner) {
    return false
  }

  closeAll()
  openWinner(true)
  startTimer()
  setPending(true)
  return true
}
