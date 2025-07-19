"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatuses = void 0;
var OrderStatuses;
(function (OrderStatuses) {
    OrderStatuses[OrderStatuses["OrderPlaced"] = 1] = "OrderPlaced";
    OrderStatuses[OrderStatuses["OrderPacked"] = 2] = "OrderPacked";
    OrderStatuses[OrderStatuses["Outfordelivery"] = 3] = "Outfordelivery";
    OrderStatuses[OrderStatuses["Delivered"] = 4] = "Delivered";
    OrderStatuses[OrderStatuses["Cancelled"] = 5] = "Cancelled";
})(OrderStatuses || (exports.OrderStatuses = OrderStatuses = {}));
//# sourceMappingURL=OrderStatuses.js.map