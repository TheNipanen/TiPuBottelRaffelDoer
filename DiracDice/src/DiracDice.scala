import scala.util.Random
import scala.collection.mutable.HashMap

object DiracDice extends App {
  
  def diracRound(pos: Array[Int], score: Array[Int], roller: Int): (Long, Long) = {
    if (score(0) >= 21) return (1L, 0L)
    if (score(1) >= 21) return (0L, 1L)
    
    var wins1 = 0L
    var wins2 = 0L
    
    // Simulate all possible dice combinations
    var i = 3
    while (i < 9) {
      val nextPos = pos.clone()
      nextPos(roller) += i
      nextPos(roller) %= 10
      if (nextPos(roller) == 0) nextPos(roller) = 10
      val nextScore = score.clone()
      nextScore(roller) += nextPos(roller)
      val (w1, w2) = diracRound(nextPos, nextScore, 1 - roller)
      
      // We don't need to calculate all possible combinations, but all possible sums and multiply by the occurrence
      val multiplier = i match {
        case 3 => 1L
        case 4 => 3L
        case 5 => 6L
        case 6 => 7L
        case 7 => 6L
        case 8 => 3L
        case 9 => 1L
      }
      
      wins1 += w1 * multiplier
      wins2 += w2 * multiplier
      i += 1
    }
    return (wins1, wins2)
  }
  
  def diracGame(): (Long, Long) = {
    val pos = Array( r.nextInt(10), r.nextInt(10) )
    val score = Array( 0, 0 )
    
    return diracRound(pos,score,0)
  }
  
  val r = new Random()
  
  val input = scala.io.StdIn.readLine("Give the list of participants as a comma-separated list on one line:\n")
  val names = r.shuffle(input.split(",").toList).toArray
  val allPairs = for ((x, ix) <- names.zipWithIndex; (y ,iy) <- names.zipWithIndex if (ix < iy)) yield (x, y)
  
  val wins = HashMap[String, Long]()
  names.foreach( wins(_) = 0L )
  
  println("Simulating...")
  
  // Play all players against each other
  for (pair <- allPairs) {
    val w = diracGame()
    wins(pair._1) += w._1
    wins(pair._2) += w._2
  }
  
  for (i <- 0 until names.length) {
    val name = names(i)
    println(name + (" " * (25 - name.length)) + " wins in " + wins(name) + " universes")
  }
  
  println("The winner is " + wins.maxBy( _._2 )._1)
  println("Congratulations!")
}