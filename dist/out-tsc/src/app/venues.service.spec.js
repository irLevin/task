import { TestBed } from '@angular/core/testing';
import { VenuesService } from './venues.service';
describe('VenuesService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(VenuesService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=venues.service.spec.js.map