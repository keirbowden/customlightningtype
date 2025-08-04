public with sharing class LimitConsumptionOverview {
    @InvocableMethod(label='Get Consumption Overview' description='Get limit consumption information')
    public static List<LimitConsumptionResponse> consumptionOverview(List<LimitConsumptionRequest> req) {
        System.debug('Tracker name=' + req[0].trackerName);
        System.debug('Tracker Value= ' + req[0].daysWrapper.value);
        List<LimitSnapshot> snapshots=new List<LimitSnapshot>();
        snapshots.add(new LimitSnapshot('SN-001', System.now().addDays(-5), 5, 15));
        snapshots.add(new LimitSnapshot('SN-002', System.now().addDays(-4), 10, 20));
        snapshots.add(new LimitSnapshot('SN-003', System.now().addDays(-3), 9, 18));
        snapshots.add(new LimitSnapshot('SN-004', System.now().addDays(-2), 12, 450));
        LimitConsumption lc=new LimitConsumption('Order Commit', snapshots);
        LimitConsumptionResponse resp=new LimitConsumptionResponse(new List<LimitConsumption>{lc});

        List<LimitConsumptionResponse> responseList = new List<LimitConsumptionResponse>();
        responseList.add(resp);

        return responseList;
    }

    public class LimitConsumptionRequest {
        @InvocableVariable
        public String trackerName;

        @InvocableVariable
        public SliderIntegerWrapper daysWrapper;
    }
    

    public class LimitConsumptionResponse {
        
        @InvocableVariable
        public List<LimitConsumption> consumptions;
             
        public LimitConsumptionResponse(List<LimitConsumption> consumptions) {
            this.consumptions = consumptions;
        }
    }
    
    public class LimitConsumption { 
        @InvocableVariable
        public String name;
                
        @InvocableVariable
        public List<LimitSnapshot> snapshots;         
        
        public LimitConsumption(String name, List<LimitSnapshot> snapshots) {
            this.name = name;
            this.snapshots = snapshots;
        }
    }

    public class LimitSnapshot {
        @InvocableVariable
        public String name;

        @InvocableVariable
        public DateTime capturedDT;

        @InvocableVariable 
        public Integer cpu;

        @InvocableVariable 
        public Integer heap;

        public LimitSnapshot(String name, Datetime capturedDT, Integer cpu, Integer heap) {
            this.name=name;
            this.capturedDT=capturedDT;
            this.cpu=cpu;
            this.heap=heap;
        }
    }
}