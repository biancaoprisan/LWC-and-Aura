/**
 * Created by boprisan on 7/26/2022.
 */

public with sharing class SetChallenge {

    public static void commonElements(List<Integer> l1, List<Integer> l2, List<Integer> l3){

        Set<Integer> sSet = new Set<Integer>();
        sSet.addAll(l1);
        sSet.retainAll(l2);
        sSet.retainAll(l3);
        System.debug(sSet);

    }
}